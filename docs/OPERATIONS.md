# Operational Guide: Rule Synchronization

Detailed instructions for managing and automating the rule synchronization engine.

## Advanced Control

The synchronization agent (`setup.sh`) supports several flags:

- `--no-self-update`: Skip automatic `git pull` of this repository. Useful for air-gapped environments or when manual version control is preferred.
- `--quiet`: Suppress terminal output (ideal for automation and non-interactive scripts).
- `--uninstall-cron`: Remove the automated sync task from the system's crontab.

## Configuration

You can also control automation by setting `"autoUpdate": false` in your `sync-config.json`.

## Manual Invocation

If you prefer to update rules manually without automation:
- **Linux/macOS**: `./bin/manual-sync.sh`
- **Windows**: `bin\manual-sync.bat`
