/**
 * Validates that all vocabulary IDs in app/data/vocabulary.js are unique.
 */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'vocabulary.js'), 'utf8');
const ids = [...src.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
const seen = new Set();
const dupes = [];

for (const id of ids) {
  if (seen.has(id)) dupes.push(id);
  seen.add(id);
}

if (dupes.length) {
  console.error('FAIL: Duplicate vocabulary IDs found:', dupes);
  process.exit(1);
}

console.log(`PASS: All ${ids.length} vocabulary IDs are unique.`);
