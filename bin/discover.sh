#!/bin/bash

# Get the project root directory
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$1" ]; then
  echo "Usage: ./bin/discover.sh <project-path>"
  exit 1
fi

node "$ROOT_DIR/scripts/discover.js" "$1"
