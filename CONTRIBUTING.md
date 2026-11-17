# Contributing to Easy English

Thank you for your interest in improving Easy English! This guide will help you
get set up and make useful contributions.

## Project overview

Easy English is an English-learning app for Malagasy learners. The same HTML/CSS/JS
codebase powers three targets: a web PWA (`app/`), a desktop Electron app
(`desktop/`), and an Android WebView shell (`android/`).

## Getting started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/tianabizna-ctrl/english-preparations.git
   cd english-preparations
   ```

2. **Run the web app locally:**
   ```bash
   cd app && python3 -m http.server 8788
   ```
   Open `http://localhost:8788/` in a browser.

3. **Run the desktop app:**
   ```bash
   cd desktop && npm install && npm start
   ```

4. **Build the Android APK** (requires Android SDK):
   ```bash
   cd android && ./gradlew assembleDebug
   ```

5. **Run the checks** from the repository root:
   ```bash
   npm test
   ```

## Project structure

```
app/                  ← shared web app (HTML/CSS/JS, no build step)
  app.js              ← main application logic (~3,400 lines)
  styles.css          ← all styles
  index.html          ← single-page app shell
  data/               ← lesson content as JS data files
  sw.js               ← service worker for offline PWA
android/              ← native Android WebView wrapper
  app/src/main/java/  ← MainActivity with TTS bridge
  sync-web.sh         ← copies app/ into Android assets
desktop/              ← Electron wrapper
  main.cjs            ← Electron main process
br-am-webapp/         ← standalone British vs American English mini-app
branding/             ← master icon sources (SVG, PNG, ICNS, ICO)
Curriculum/           ← reference PDF documents
scripts/              ← build/data scripts (verse fetcher)
test/                 ← validation scripts run by `npm test`
```

## Key conventions

- **No build step for the web app.** `app/` is served as-is. Keep it that way
  for simplicity.
- **Data files** (`app/data/*.js`) export global variables (e.g., `VOCABULARY`,
  `GRAMMAR`). Each entry needs a unique `id`.
- **Single source of truth.** Edit content in `app/` only. The Android assets
  (`android/app/src/main/assets/www/`) are generated automatically by the Gradle
  `syncWeb` task and are git-ignored.
- **British English first.** British English is the primary form; American
  alternatives are noted where they differ.
- **Malagasy hints** are shown for Beginner through Pre-Intermediate levels and
  hidden at higher levels. Mark Malagasy text with `lang="mg"` so screen readers
  pronounce it correctly.
- **Escape untrusted text.** Any dynamic value interpolated into an `innerHTML`
  string must go through `escapeHtml()`.

## Making changes

1. Create a branch from `main`.
2. Make your changes in `app/` (content, styles, logic).
3. Test in a browser (`cd app && python3 -m http.server 8788`).
4. Run `npm test` and fix anything it reports.
5. Open a pull request with a clear description of what changed and why.

## Adding vocabulary

Add entries to `app/data/vocabulary.js` following the existing structure:

```javascript
{
  id: 'category-123',       // unique ID (category prefix + number)
  category: 'Category',
  categoryMg: 'Malagasy category name',
  word: 'english word',
  phonetic: 'pronunciation guide',
  malagasy: 'Malagasy translation',
  example: 'An example sentence.',
  british: true,
  usNote: null,              // or 'American alternative'
  emoji: '🔤',
}
```

`npm test` verifies that every ID is unique.

## Reporting issues

Open an issue on GitHub with:
- What you expected to happen
- What actually happened
- Your browser/device and OS
- Screenshots if relevant

## Code of conduct

Be kind, be respectful, and remember this app is built for young learners.
