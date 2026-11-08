#!/bin/sh
# Turns photos of shelf things into transparent cut-outs for the Now page.
#
#   sh app/scripts/cutout.sh photos/originals/shelf/mug-1.jpg [more photos...]
#
# Each photo becomes app/src/assets/shelf/<same name>.webp, which replaces the drawn placeholder
# for the shelf entry with that id in app/src/data/now.ts. Keep originals in photos/originals/shelf.
set -eu

here=$(cd "$(dirname "$0")" && pwd)
out="$here/../src/assets/shelf"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$out"

for photo in "$@"; do
  name=$(basename "${photo%.*}")
  swift "$here/cutout.swift" "$photo" "$tmp/$name.png"
  # Shelf things are drawn small, so 800px on the long edge is plenty; keep the edges of the alpha crisp
  sips -Z 800 "$tmp/$name.png" --out "$tmp/$name-small.png" >/dev/null
  cwebp -quiet -q 80 -alpha_q 90 "$tmp/$name-small.png" -o "$out/$name.webp"
  echo "wrote src/assets/shelf/$name.webp"
done
