/**
 * Validates that every file listed in the service worker's APP_SHELL
 * actually exists in app/.
 */
const fs = require('fs');
const path = require('path');

const sw = fs.readFileSync(path.join(__dirname, '..', 'app', 'sw.js'), 'utf8');
const cached = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]);
const appDir = path.join(__dirname, '..', 'app');
const missing = cached.filter(f => !fs.existsSync(path.join(appDir, f)));

if (missing.length) {
  console.error('FAIL: Service worker references missing files:', missing);
  process.exit(1);
}

console.log(`PASS: All ${cached.length} service-worker cache entries exist.`);
