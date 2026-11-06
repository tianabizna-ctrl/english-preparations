#!/usr/bin/env bash
# Copies the shared web app (../app) into the Android assets folder so a Gradle
# build always bundles the latest content. The Gradle build runs this
# automatically (see app/build.gradle); run it manually if you only need the
# assets without a full build.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/../app"
DEST="$HERE/app/src/main/assets/www"

rm -rf "$DEST"
mkdir -p "$DEST"
# Copy everything except macOS metadata and the generated output dir.
rsync -a --exclude '.DS_Store' "$SRC/" "$DEST/"

echo "Synced web app -> $DEST"
