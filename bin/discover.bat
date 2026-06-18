@echo off
setlocal

set "ROOT_DIR=%~dp0.."

if "%~1"=="" (
  echo Usage: bin\discover.bat ^<project-path^>
  exit /b 1
)

node "%ROOT_DIR%\scripts\discover.js" %1
