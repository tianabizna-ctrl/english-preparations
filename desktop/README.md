# Easy English desktop app

This folder packages the shared `../app` web app as a native desktop
application with Electron. It is named **Easy English**, uses the icon in
`build/`, and keeps the same learning content and progress as the web version.

## Development

```bash
npm install
npm start
```

## Build a local unpacked app

```bash
npm run pack
```

## Build installers

On macOS (creates `.dmg` and `.zip` for Intel and Apple Silicon):

```bash
npm run dist:mac             # both architectures
npm run dist:mac:universal   # one universal installer
```

On Windows PowerShell (creates an NSIS installer and a portable `.exe`):

```powershell
npm run dist:win
```

You can also build a Windows installer on macOS if [Wine](https://wiki.winehq.org/)
is installed:

```bash
npm run dist:win
```

## Icons and branding

The icon comes from `build/icon.icns` (macOS) and `build/icon.ico` (Windows),
generated from the master design in `../branding/`. To use a different icon,
replace both files (and `build/icon.png` for Linux) and rebuild.

## Notes

- The app loads the shared `../app` directory as a packaged resource
  (`resources/app`), so web and desktop versions stay in sync.
- Builds are unsigned by default. macOS Gatekeeper and Windows SmartScreen may
  warn on first launch — add code signing before public distribution.
