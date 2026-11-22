#!/usr/bin/env bash
# Copy the static site from the mockup folder into public/ and version asset URLs.
set -euo pipefail
src="${1:-$HOME/dev/olle-site-mockups/e4}"
cd "$(dirname "$0")/.."
rsync -a --exclude shots --exclude '*.md' --exclude 'trace*' --exclude '*-src.png' "$src"/ public/
v=$(date +%s)
for f in public/*.html; do
  sed -i -E "s#(href|src)=\"(/?)(site\.css|site\.js|data\.js)(\?v=[0-9a-z]+)?\"#\1=\"\2\3?v=$v\"#g" "$f"
done
