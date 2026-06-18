@echo off
setlocal

set "ROOT_DIR=%~dp0.."

if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help

echo Running manual synchronization...
node "%ROOT_DIR%\scripts\sync.js"
goto :eof

:show_help
echo Usage: manual-sync.bat [options]
echo.
echo Options:
echo   --help         Show this help message
goto :eof
