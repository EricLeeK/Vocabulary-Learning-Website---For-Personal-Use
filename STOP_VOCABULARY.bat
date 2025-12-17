@echo off
chcp 65001 >nul
echo 正在关闭 ToonVocab 服务器...

:: Kill Node.js processes on ports 3000 and 3001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo ✅ 服务器已关闭！
pause
