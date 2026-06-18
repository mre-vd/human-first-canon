@echo off
setlocal

set "DIR=%~dp0"
set "ROOT_DIR=%~dp0.."
set "CONFIG_FILE=%ROOT_DIR%\sync-config.json"

if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help

echo Running setup and synchronization...
node "%ROOT_DIR%\scripts\sync.js"
goto :eof

:show_help
echo Usage: setup.bat [options]
echo.
echo Options:
echo   --help         Show this help message
echo.
echo Note: For full automation (cron/git auto-update), please use a Linux/macOS environment
echo or manually configure Windows Task Scheduler.
goto :eof
