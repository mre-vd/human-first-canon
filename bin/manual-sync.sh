#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

source "$DIR/.core-sync.sh"

show_help() {
  echo "Usage: ./bin/manual-sync.sh [options]"
  echo ""
  echo "Options:"
  echo "  --no-self-update   Skip automatic git pull of the rules repository"
  echo "  --quiet            Run silently (no terminal output)"
  echo "  -h, --help         Show this help message"
  echo ""
  echo "Example:"
  echo "  ./bin/manual-sync.sh"
}

# Handle Arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --quiet) QUIET=true ;;
    --no-self-update) AUTO_UPDATE=false ;;
    -h|--help) show_help; exit 0 ;;
    *) echo "Unknown parameter: $1. Use --help for usage."; exit 1 ;;
  esac
  shift
done

run_core_sync
