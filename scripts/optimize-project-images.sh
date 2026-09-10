#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

find "$PROJECT_ROOT/public/projects" -type f -name '*.png' -print0 |
  while IFS= read -r -d '' source_image; do
    output_image="${source_image%.png}.avif"
    avifenc -q 60 --yuv 444 -s 6 "$source_image" "$output_image"
  done
