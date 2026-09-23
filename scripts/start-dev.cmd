@echo off
set ROOT=%~dp0..
cd /d "%ROOT%"
start "aarogya-backend" /min cmd /c "node server\index.js >%TEMP%\opencode\aarogya-backend.log 2>&1"
start "aarogya-web" /min cmd /c "npm run dev:web >%TEMP%\opencode\aarogya-web.log 2>&1"