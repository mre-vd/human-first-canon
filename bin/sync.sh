#!/bin/bash

# Get the project root directory
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Configuration
LOG_FILE="$ROOT_DIR/sync.log"
LOCK_FILE="$ROOT_DIR/.sync.lock"
CONFIG_FILE="$ROOT_DIR/sync-config.json"
CRON_SCHEDULE="0 * * * *" # Every hour by default

# Flags (Default values)
QUIET=false
AUTO_UPDATE=true

# Read AUTO_UPDATE from config if exists
if [ -f "$CONFIG_FILE" ]; then
  JSON_AUTO_UPDATE=$(node -p "const c = require('$CONFIG_FILE'); c.autoUpdate !== undefined ? c.autoUpdate : true" 2>/dev/null)
  if [ "$JSON_AUTO_UPDATE" = "false" ]; then
    AUTO_UPDATE=false
  fi
fi

# Helper for logging
log() {
  local msg="[$(date +'%Y-%m-%d %H:%M:%S')] $1"
  if [ "$QUIET" = false ]; then
    echo "$msg"
  fi
  echo "$msg" >> "$LOG_FILE"
}

# Cleanup lock on exit
cleanup() {
  rm -f "$LOCK_FILE"
}

# Install/Uninstall Cron
install_cron() {
  local script_path="$ROOT_DIR/bin/sync.sh"
  local cron_cmd="$CRON_SCHEDULE $script_path --quiet"
  
  (crontab -l 2>/dev/null | grep -v "$script_path"; echo "$cron_cmd") | crontab -
  echo "Cron job installed: $cron_cmd"
}

uninstall_cron() {
  local script_path="$ROOT_DIR/bin/sync.sh"
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
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

# Check if already running
if [ -f "$LOCK_FILE" ]; then
  # Check if PID is still active
  PID=$(cat "$LOCK_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    log "Error: Sync already in progress (PID: $PID). Skipping."
    exit 0
  fi
fi

# Set lock
echo $$ > "$LOCK_FILE"
trap cleanup EXIT

# 1. Self-Update (Git)
if [ "$AUTO_UPDATE" = true ] && [ -d ".git" ]; then
  log "Fetching updates from remote..."
  # Stash local changes to avoid merge conflicts
  git stash push -m "Auto-sync stash $(date)" > /dev/null 2>&1
  
  if git pull --rebase origin main > /dev/null 2>&1; then
    log "Successfully updated from remote."
  else
    log "Warning: Failed to update from remote. Using local version."
  fi
  
  # Pop changes back if they were stashed
  git stash pop > /dev/null 2>&1
elif [ "$AUTO_UPDATE" = false ]; then
  log "Skipping self-update (manual control enabled)."
fi

# 2. Run Sync Script
log "Starting rule synchronization..."
if node scripts/sync.js >> "$LOG_FILE" 2>&1; then
  log "Sync complete."
else
  log "Error: Synchronization failed. Check $LOG_FILE for details."
  exit 1
fi
