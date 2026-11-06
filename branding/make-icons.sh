#!/usr/bin/env bash
#
# Regenerate every platform icon for Easy English from the SVG sources.
#
# Requirements (macOS): qlmanage + iconutil + sips (built-in) and ImageMagick
# (`brew install imagemagick`). QuickLook is used to rasterise the SVG because
# it renders gradients and fonts correctly through WebKit.
#
# Usage:  ./make-icons.sh
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
OUT="$HERE/out"

echo "▸ Rendering master icons from SVG…"
rm -rf "$OUT"
mkdir -p "$OUT"
qlmanage -t -s 1024 -o "$OUT" "$HERE/icon.svg" >/dev/null 2>&1
qlmanage -t -s 1024 -o "$OUT" "$HERE/icon-foreground.svg" >/dev/null 2>&1
cp "$OUT/icon.svg.png" "$HERE/icon.png"
cp "$OUT/icon-foreground.svg.png" "$HERE/icon-foreground.png"

echo "▸ macOS .icns…"
rm -rf "$HERE/icon.iconset" && mkdir -p "$HERE/icon.iconset"
for s in 16 32 128 256 512; do
  magick "$HERE/icon.png" -resize ${s}x${s} "$HERE/icon.iconset/icon_${s}x${s}.png"
  magick "$HERE/icon.png" -resize $((s * 2))x$((s * 2)) "$HERE/icon.iconset/icon_${s}x${s}@2x.png"
done
iconutil -c icns "$HERE/icon.iconset" -o "$HERE/icon.icns"

echo "▸ Windows .ico…"
magick "$HERE/icon.png" -define icon:auto-resize=256,128,64,48,32,16 "$HERE/icon.ico"

echo "▸ Web / PWA icons…"
mkdir -p "$ROOT/app/icons"
magick "$HERE/icon.png" -resize 512x512 "$ROOT/app/icons/icon-512.png"
magick "$HERE/icon.png" -resize 192x192 "$ROOT/app/icons/icon-192.png"
magick "$HERE/icon.png" -resize 512x512 "$ROOT/app/icons/icon-maskable-512.png"
magick "$HERE/icon.png" -resize 180x180 "$ROOT/app/icons/apple-touch-icon.png"
magick "$HERE/icon.png" -resize 32x32 "$ROOT/app/icons/favicon-32.png"
magick "$HERE/icon.png" -resize 16x16 "$ROOT/app/icons/favicon-16.png"
magick "$HERE/icon.png" -define icon:auto-resize=48,32,16 "$ROOT/app/favicon.ico"

echo "▸ Desktop build icons…"
mkdir -p "$ROOT/desktop/build"
cp "$HERE/icon.icns" "$ROOT/desktop/build/icon.icns"
cp "$HERE/icon.ico"  "$ROOT/desktop/build/icon.ico"
cp "$HERE/icon.png"  "$ROOT/desktop/build/icon.png"

echo "▸ Android launcher icons…"
RES="$ROOT/android/app/src/main/res"
for entry in mdpi:48:108 hdpi:72:162 xhdpi:96:216 xxhdpi:144:324 xxxhdpi:192:432; do
  d="${entry%%:*}"; rest="${entry#*:}"; L="${rest%%:*}"; F="${rest#*:}"
  mkdir -p "$RES/mipmap-$d"
  magick "$HERE/icon.png" -resize ${L}x${L} "$RES/mipmap-$d/ic_launcher.png"
  magick "$HERE/icon.png" -resize ${L}x${L} "$RES/mipmap-$d/ic_launcher_round.png"
  magick "$HERE/icon-foreground.png" -resize ${F}x${F} "$RES/mipmap-$d/ic_launcher_foreground.png"
done

echo "✅ Icons regenerated."
