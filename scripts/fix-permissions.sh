#!/usr/bin/env bash
# Fix executable bits on files that should not be executable (PDFs, etc.)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

# Remove executable bit from PDFs
find Curriculum -name '*.pdf' -exec git update-index --chmod=-x {} +

echo "Fixed file permissions. Run 'git commit' to save the changes."
