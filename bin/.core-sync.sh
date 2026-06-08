#!/bin/bash

# This is an internal core script. Do not run it directly.
# It contains the shared logic for synchronization, git updates, and locking.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG_FILE="$ROOT_DIR/sync-config.json"
LOG_FILE="$ROOT_DIR/sync.log"
LOCK_FILE="$ROOT_DIR/.sync.lock"
CRON_SCHEDULE="0 * * * *"

# Default Flags
QUIET=false
AUTO_UPDATE=true
MODE="sync" # default mode

# Helper for logging
log() {
  local msg="[$(date +'%Y-%m-%d %H:%M:%S')] $1"
  if [ "$QUIET" = false ]; then
    echo "$msg"
  fi
  echo "$msg" >> "$LOG_FILE"
}

cleanup() {
  rm -f "$LOCK_FILE"
}

# Read AUTO_UPDATE from config if exists
if [ -f "$CONFIG_FILE" ]; then
  JSON_AUTO_UPDATE=$(node -p "const c = require('$CONFIG_FILE'); c.autoUpdate !== undefined ? c.autoUpdate : true" 2>/dev/null)
  if [ "$JSON_AUTO_UPDATE" = "false" ]; then
    AUTO_UPDATE=false
  fi
fi

# Core Logic Function
run_core_sync() {
  # Check if already running
  if [ -f "$LOCK_FILE" ]; then
    PID=$(cat "$LOCK_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      log "Error: Sync already in progress (PID: $PID). Skipping."
      exit 0
    fi
  fi

  echo $$ > "$LOCK_FILE"
  trap cleanup EXIT

  # 1. Self-Update (Git)
  if [ "$AUTO_UPDATE" = true ] && [ -d "$ROOT_DIR/.git" ]; then
    log "Fetching updates from remote..."
    git -C "$ROOT_DIR" stash push -m "Auto-sync stash $(date)" > /dev/null 2>&1
    if git -C "$ROOT_DIR" pull --rebase origin main > /dev/null 2>&1; then
      log "Successfully updated from remote."
    else
      log "Warning: Failed to update from remote. Using local version."
    fi
    git -C "$ROOT_DIR" stash pop > /dev/null 2>&1
  elif [ "$AUTO_UPDATE" = false ] && [ "$QUIET" = false ]; then
    log "Skipping self-update (manual control enabled)."
  fi

  # 2. Run Sync Script
  log "Starting rule synchronization..."
  NODE_BIN=$(which node)
  if "$NODE_BIN" "$ROOT_DIR/scripts/sync.js" >> "$LOG_FILE" 2>&1; then
    log "Sync complete."
  else
    log "Error: Synchronization failed. Check $LOG_FILE for details."
    exit 1
  fi
}
