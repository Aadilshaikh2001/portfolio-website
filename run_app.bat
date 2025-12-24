@echo off
cd /d "%~dp0"

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

echo Starting Frontend Application...
start "Frontend App" cmd /k "node node_modules/react-scripts/bin/react-scripts.js start"

echo ===================================================
echo App is starting!
echo Backend will run on http://localhost:5000
echo Frontend will open at http://localhost:3000
echo ===================================================
pause
