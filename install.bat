@echo off
echo.
echo ========================================
echo   TPlace - Instalacao Rapida
echo ========================================
echo.

REM Verifica se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
node --version
echo.
echo [OK] npm encontrado
npm --version
echo.

echo Instalando dependencias...
echo.
npm install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Instalacao concluida!
    echo ========================================
    echo.
    echo Para iniciar o projeto, execute:
    echo   npm run dev
    echo.
    echo O navegador abrira automaticamente em http://localhost:3000
    echo.
) else (
    echo.
    echo [ERRO] Falha na instalacao
    echo.
    echo Tente novamente com:
    echo   npm install --legacy-peer-deps
    echo.
)

pause
