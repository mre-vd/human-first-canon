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
  echo "Usage: ./bin/setup.sh [options]"
  echo ""
  echo "Options:"
  echo "  --install-cron     Install automated sync task in crontab"
  echo "  --uninstall-cron   Remove automated sync task from crontab"
  echo "  --no-self-update   Skip automatic git pull of the rules repository"
  echo "  --quiet            Run silently (no terminal output)"
  echo "  -h, --help         Show this help message"
  echo ""
  echo "Example:"
  echo "  ./bin/setup.sh --install-cron"
}

install_cron() {
  local script_path="$DIR/setup.sh"
  local cron_cmd="$CRON_SCHEDULE $script_path --quiet"
  (crontab -l 2>/dev/null | grep -v "$script_path"; echo "$cron_cmd") | crontab -
  echo "Cron job installed: $cron_cmd"
}

uninstall_cron() {
  local script_path="$DIR/setup.sh"
  crontab -l 2>/dev/null | grep -v "$script_path" | crontab -
  echo "Cron job removed."
}

# Handle Arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --install-cron) install_cron; exit 0 ;;
    --uninstall-cron) uninstall_cron; exit 0 ;;
    --quiet) QUIET=true ;;
    --no-self-update) AUTO_UPDATE=false ;;
    -h|--help) show_help; exit 0 ;;
    *) echo "Unknown parameter: $1. Use --help for usage."; exit 1 ;;
  esac
  shift
done

run_core_sync
