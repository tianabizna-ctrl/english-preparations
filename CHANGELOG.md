# Changelog

All notable changes to Easy English will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `LICENSE` file (MIT).
- `CONTRIBUTING.md` with development setup and contribution guidelines.
- `CHANGELOG.md` to track changes.
- Root `package.json` with project-wide scripts (`npm test`, `npm start`).
- Validation tests for vocabulary IDs and the service worker cache list.
- GitHub Actions CI workflow (syntax checks, data validation, no hardcoded paths).
- GitHub Actions workflow for deploying the web app to GitHub Pages.
- ARIA `role="tab"` and `aria-selected` attributes on navigation buttons.
- `lang="mg"` attribute on Malagasy hint text for correct screen-reader pronunciation.
- Electron `will-navigate` handler to prevent navigation to external URLs.

### Fixed
- Hardcoded absolute path in README.md replaced with a relative command.
- Manifest `theme_color` and `background_color` now match `index.html`.
- `innerHTML` interpolations now use `escapeHtml()` consistently.
- Android WebView `setAllowFileAccess` set to `false` (reduces attack surface).

### Changed
- `.gitignore` updated to exclude `android/local.properties`,
  `android/app/src/main/assets/www/` (generated at build time), and
  `scripts/.verse-cache.json`.

### Documentation
- README now documents the `br-am-webapp/` mini-app, the development workflow,
  GitHub Pages deployment, and the project license.

## [1.0.0] — 2026-11-16

### Added
- Initial release: Practice lessons, vocabulary (415 words), alphabet with IPA,
  classroom English, grammar, reading, writing, conversations, drills, listening,
  speaking, curriculum (Beginner–Advanced), 365-day Bible devotional.
- Web PWA, Electron desktop, and Android WebView targets.
- British and American English accent support.
- Day/night theme, adjustable text size, study levels, speaking speed controls.
- Offline support via service worker.
