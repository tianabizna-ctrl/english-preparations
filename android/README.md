# Easy English — Android app

A native Android shell (single `WebView` activity) that bundles the shared web
app in [`../app`](../app) and adds device text-to-speech. The learning content,
progress saving and all screens come from the same web app used on desktop.

```
android/
├─ app/src/main/assets/www/        ← generated copy of ../app (see sync-web.sh)
├─ app/src/main/java/com/easyenglish/mianatra/MainActivity.java
├─ app/src/main/res/               ← launcher icon, colours, theme
└─ sync-web.sh                     ← re-copy ../app into the APK assets
```

## Why a WebView shell?

The app is plain HTML/CSS/JavaScript, so wrapping it in a WebView keeps a single
source of truth for the lessons while still producing a real installable APK
with its own icon, name and offline content. `MainActivity` exposes the Android
`TextToSpeech` engine to JavaScript as `window.AndroidTTS`; the bundled
`app/tts-bridge.js` turns that into the `window.speechSynthesis` API the web app
already uses, so the 🔊 buttons speak English on the phone.

## Requirements

- **Android Studio** (Ladybug or newer) **or** command-line JDK 17+ and the Android SDK.
- SDK components used by this project: **platform `android-35`** (compileSdk) and
  **build-tools 34.0.0**. `minSdk` is 21 and `targetSdk` is 34.
- The Gradle wrapper is included (`./gradlew`), so no global Gradle install is needed.
- Gradle finds the SDK via `local.properties` (`sdk.dir=…`) or the
  `ANDROID_HOME` / `ANDROID_SDK_ROOT` environment variable.
- **A JDK that ships `jmods` (a working `jlink`).** AGP runs `jlink --version`
  while resolving its JDK-image transform, and it looks up `jlink` on `PATH`.
  If `PATH` resolves to macOS's `/usr/bin/jlink` stub with no system JDK
  installed, that command **hangs forever**. Build with a full JDK, for example:

  ```bash
  export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
  export PATH="$JAVA_HOME/bin:$PATH"        # so a real jlink precedes /usr/bin/jlink
  ```

  Note the JetBrains "nomod" runtimes (used by some IDEs) are built without
  `jmods`, so their `jlink` also hangs — don't use those for Android builds.

## Build

Open the `android/` folder in Android Studio and press **Run**, or from a
terminal:

```bash
cd android
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
./gradlew assembleDebug      # APK  -> app/build/outputs/apk/debug/Easy English 1.0.0.apk
./gradlew installDebug       # build + install on a connected device/emulator
```

Release build (signed):

```bash
./gradlew assembleRelease    # app/build/outputs/apk/release/app-release.apk
./gradlew bundleRelease      # .aab for Google Play
```

Without a signing config the release output is `app-release-unsigned.apk`;
sign it with `apksigner` or add a `signingConfigs` block.

For a signed release, create a keystore and add a `signingConfigs` block in
`app/build.gradle` (see the Android documentation), then rebuild.

Install a built APK on a phone:

```bash
adb install -r "app/build/outputs/apk/debug/Easy English 1.0.0.apk"
```

## Updating the learning content

The web content lives only in `../app`. Before every Gradle build a `syncWeb`
task copies it into `src/main/assets/www`. To refresh the assets without a full
build:

```bash
./sync-web.sh
```

## Notes

- **Offline:** all lessons are bundled in the APK. The app only reaches the
  network to load the Google Fonts used by the UI (falls back gracefully).
- **Speech recognition** (the Speaking practice "Start speaking" button) is not
  provided by Android's WebView, so that screen shows its built-in
  "not available in this browser" note. All other speech (**text-to-speech**)
  works through the native bridge.
- **Package name:** `com.easyenglish.mianatra` · **min Android:** 5.0 (API 21).
- Prefer no build tooling? The web app is also an installable **PWA** — see the
  “Add to Home screen” instructions in the top-level `README.md`.
