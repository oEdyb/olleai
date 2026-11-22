#!/usr/bin/env bash
# Version asset URLs in public/*.html (optionally import a new static build first).
set -euo pipefail
src="${1:-}"
cd "$(dirname "$0")/.."
# public/ is the source of truth (others edit it too). Pass a folder only to import a new build into it.
[ -n "$src" ] && rsync -a --exclude shots --exclude '*.md' --exclude 'trace*' --exclude '*-src.png' "$src"/ public/
v=$(date +%s)
for f in public/*.html; do
  sed -i -E "s#(href|src)=\"(/?)(site\.css|site\.js|data\.js)(\?v=[0-9a-z]+)?\"#\1=\"\2\3?v=$v\"#g" "$f"
done
