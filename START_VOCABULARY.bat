@echo off
chcp 65001 >nul
title ToonVocab - 开始背单词！

echo.
echo ╔═══════════════════════════════════════════╗
echo ║        🎓 ToonVocab 单词学习系统           ║
echo ║            开始背单词！                    ║
echo ╚═══════════════════════════════════════════╝
echo.

echo [1/2] 正在启动后端服务器...
cd /d "%~dp0server"
start "ToonVocab Backend" cmd /k "npm start"

echo [2/2] 正在启动前端...
cd /d "%~dp0"
timeout /t 2 /nobreak >nul
start "ToonVocab Frontend" cmd /k "npm run dev"

echo.
echo ✅ 服务器启动中...
echo.
echo 请等待几秒钟，然后在浏览器中访问:
echo 👉 http://localhost:3000/
echo.
echo 按任意键自动打开浏览器...
pause >nul

start http://localhost:3000/
