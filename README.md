# Easy English — Mianatra Anglisy

Easy English is an English-learning app for Malagasy learners, especially
primary-school pupils. It includes guided Practice lessons, useful vocabulary,
the alphabet with IPA, numbers, days, months and measuring, classroom English
("teny baiko"), village and family life, grammar, reading, writing,
conversations, speaking practice, Drills and a one-year daily Bible devotional
with new words to learn every day.

The same learning content powers three targets:

| Target | Folder | How it is built |
|---|---|---|
| Web / installable PWA | `app/` | no build step (static files) |
| Desktop — macOS & Windows | `desktop/` | Electron + electron-builder |
| Android | `android/` | native WebView shell + Gradle |

The app icon and brand artwork are in `branding/` (source `branding/icon.svg`).

## Using the app

Easy English is built as an app, not a scrolling web page: a fixed frame with a
navigation rail on the left (desktop) or a bottom tab bar (phones), a title bar
that names the current screen, and one scrollable content panel.

- **Navigation** — *Practice · Learning path · Useful vocabulary · Alphabet &
  essentials · Classroom English · Conversations* are always one tap away;
  Grammar, Irregular verbs, Reading, Writing, Drills, Listening, Speaking,
  Daily devotional and Progress live under **More** on phones.
- **Alphabet & essentials** — the 26 letters with the sounds they make (IPA) and
  an example word, the numbers 1–20, the days of the week, the months of the
  year, plus phrases for telling the time and for distance, length, height and
  weight. Every item has a 🔊 button that speaks it aloud.
- **Useful vocabulary** — 415 words across everyday, study, academic and
  advanced topics, including *At the Market*, *Field & Farm*, *At Home*,
  *Measuring & Distance*, *At Church* and *Academic English*.
- **Settings** — open with the ⚙️ button. From there you can choose
  **Day / Night / System** theme, text size, a study level, the speaking speed,
  British or American English and an available voice type, whether Malagasy
  hints are shown, "speak a word when I learn it", reduce motion, and reset
  progress.
- **Day / night theme** — the 🌙 / ☀️ button in the title bar switches instantly;
  *System* follows the device setting. The choice is remembered.
- **Curriculum** — choose Beginner through Advanced and follow ten complete
  units at the selected level. The curriculum tracker highlights the current
  stage, current unit, completed units, and key-word progress, while each unit
  opens a lesson plan containing outcomes, vocabulary, grammar, reading,
  writing, listening, speaking, spelling, and a review check. Malagasy hints
  stay available through Pre-Intermediate and can be corrected locally with
  the ✏️ controls.
- **Source-aligned progression** — the course maps Primary Years 1–6, the
  supplied spelling and grammar appendices, the English Glossary, Secondary
  Key Stage 3, and the supplied UN English Levels I–III document into one
  Beginner-to-Advanced route. The Irregular verbs lesson has 47 common forms.
- **Course design references** — level descriptors and skill balance were
  checked against the official British Council LearnEnglish CEFR resources,
  BBC Learning English Easy/Medium/Hard course structures, and Cambridge
  English CEFR can-do descriptors. Lesson text in the app is original.

## Daily devotional

*Daily devotional* (🕊️ · *Fandalinana Baiboly*) is a one-year journey through
the Bible for young learners:

- **365 days**, grouped into **12 monthly themes** (Beginnings, Love & Kindness,
  Faith & Trust, … Joy, Peace & Christmas).
- Every day has a **topic** in English and Malagasy, a **Bible verse** from the
  World English Bible (public domain, with "Yahweh" rendered as "the LORD"), a
  short **big idea**, and **three new English words** with their Malagasy
  meaning and an example sentence.
- The screen opens on **today's** day (by date). You can step back and forth,
  jump to *Today*, and browse any day by month and day number.
- Each word can be marked as learned, the day can be marked as read, and
  "Quiz this week's words" runs the built-in quiz over the last seven days'
  words. Devotional progress is kept separate from the main vocabulary
  percentages.

Content lives in `app/data/devotional.js` (topics, ideas and words) and
`app/data/devotional-verses.js` (verse text). To refresh the verse text from
bible-api.com:

```bash
node scripts/fetch-devotional-verses.mjs
```

The script caches its downloads in `scripts/.verse-cache.json` and is safe to
re-run; only missing verses are fetched.

## Web app

The standalone web app lives in `app/` and does not need a build step.

```bash
python3 -m http.server 8788 --directory "/Users/tianaalbert/ENGLISH PREPARATIONS/app"
```

Open `http://localhost:8788/` in a browser.

### Install as an app (PWA)

`app/` includes a web app manifest and a service worker, so it can be installed
like a native app and works offline:

- **Android / Chrome:** open the site, tap the ⋮ menu → **Add to Home screen**.
- **iOS / Safari:** Share → **Add to Home Screen**.
- **Desktop Chrome / Edge:** the install icon in the address bar.

## Desktop app (macOS & Windows)

The Electron wrapper lives in `desktop/` and packages the shared `app/`
directory, so the web and desktop versions use the same content.

```bash
cd desktop
npm install
npm start          # run the app in development
```

Build installers:

```bash
npm run dist:mac              # macOS: .dmg + .zip (Intel and Apple Silicon)
npm run dist:mac:universal    # macOS: one universal installer
npm run dist:win              # Windows: NSIS installer + portable .exe (x64)
```

macOS output lands in `desktop/dist/` as `Easy English 1.0.0 x64.dmg`,
`Easy English 1.0.0 arm64.dmg` and the matching `.zip` files.

The app is named **Easy English** and uses `desktop/build/icon.*`. electron-builder
builds the Windows installer and portable `.exe` on macOS without Wine, using its
own bundled tooling. Unsigned local builds may show Gatekeeper or SmartScreen
warnings — add code signing before public distribution.

## Android app

A native Android shell in `android/` bundles `app/` into a WebView and adds
device text-to-speech, producing an installable APK with the Easy English icon.
It needs the Android SDK (Android Studio), not just Node.

```bash
cd android
./sync-web.sh            # (optional) refresh assets/www from ../app
./gradlew assembleDebug  # -> app/build/outputs/apk/debug/Easy English 1.0.0.apk
```

See [`android/README.md`](android/README.md) for signing and release builds, and
note that Android users can also simply install the PWA above.

## Branding

| File | Purpose |
|---|---|
| `branding/icon.svg` | master icon (rounded tile) |
| `branding/icon-foreground.svg` | Android adaptive-icon foreground |
| `branding/icon.png` | 1024² master PNG |
| `branding/icon.icns` | macOS icon (copied to `desktop/build/`) |
| `branding/icon.ico` | Windows icon (copied to `desktop/build/`) |
| `app/icons/`, `app/favicon.ico` | web / PWA / Android assets |

To regenerate the platform icons after editing the SVG (macOS): render the SVG
with QuickLook, then use `sips`/`iconutil`/ImageMagick. The generated files are
already committed.

## Notes

- Progress (stars, streaks, learned words) is stored on the device in
  `localStorage`; it is never sent anywhere.
- Speech **text-to-speech** works on the web, desktop and Android. Speech
  **recognition** (the Speaking screen) needs a browser with the Web Speech API
  (Chrome/Edge) and is not available in the Android WebView or Electron.
