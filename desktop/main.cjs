const { app, BrowserWindow, session, shell, nativeTheme } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

const APP_NAME = 'Easy English';
app.setName(APP_NAME);

function getWebRoot() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app');
  }
  return path.resolve(__dirname, '..', 'app');
}

function getIconPath() {
  const candidates = app.isPackaged
    ? [path.join(process.resourcesPath, 'icon.png')]
    : [path.join(__dirname, 'build', 'icon.png')];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 960,
    minHeight: 680,
    title: APP_NAME,
    // Match the OS theme so there is no light flash before the page paints.
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#0a1120' : '#eef1f7',
    icon: getIconPath(),
    // Make it look like a native Mac app
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.loadFile(path.join(getWebRoot(), 'index.html'));

  // Open any external links in the user's browser instead of a new Electron window.
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  if (process.platform === 'darwin' && app.setAboutPanelOptions) {
    app.setAboutPanelOptions({
      applicationName: APP_NAME,
      applicationVersion: app.getVersion(),
      copyright: '© 2026 Easy English · Mianatra Anglisy',
    });
  }

  // The speaking feature needs microphone permission in the desktop renderer.
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(permission === 'media');
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
