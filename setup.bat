@echo off
setlocal enabledelayedexpansion

echo.
echo ================================================================
echo   bustaTv - Setup Automatico
echo ================================================================
echo.

REM Colors (limited in CMD)
color 0A

REM Check Python
echo [*] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Python no esta instalado
    echo     Descargalo desde: https://www.python.org/downloads/
    echo     IMPORTANTE: Marca la opcion "Add Python to PATH"
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
    echo [OK] !PYTHON_VERSION! esta instalado
)

REM Check Node.js
echo [*] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js no esta instalado
    echo     Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js !NODE_VERSION! esta instalado
)

echo.
echo [*] Configurando backend...

REM Create venv if it doesn't exist
if not exist "backend\venv" (
    echo [*] Creando entorno virtual de Python...
    cd backend
    python -m venv venv
    cd ..
) else (
    echo [OK] Entorno virtual ya existe
)

REM Activate venv and install requirements
echo [*] Instalando dependencias de Python (esto puede tardar)...
call backend\venv\Scripts\activate.bat
pip install --upgrade pip >nul 2>&1
pip install -r backend\requirements.txt >nul 2>&1
echo [OK] Dependencias de backend instaladas

REM Create .env file for backend
if not exist "backend\.env" (
    echo [*] Creando archivo .env del backend...
    (
        echo DATABASE_URL=sqlite:///./bustaTv.db
        echo SECRET_API_KEY=bustatv-dev-secret-key-changeme
    ) > backend\.env
    echo [OK] Archivo .env creado en backend\
) else (
    echo [OK] Archivo .env ya existe
)

echo.
echo [*] Configurando frontend...

REM Install frontend dependencies
if not exist "frontend\node_modules" (
    echo [*] Instalando dependencias de Node.js (esto puede tardar)...
    cd frontend
    call npm install
    cd ..
    echo [OK] Dependencias de frontend instaladas
) else (
    echo [OK] Dependencias de frontend ya instaladas
)

REM Create .env file for frontend
if not exist "frontend\.env" (
    echo [*] Creando archivo .env del frontend...
    (
        echo VITE_API_URL=http://localhost:8000
    ) > frontend\.env
    echo [OK] Archivo .env creado en frontend\
) else (
    echo [OK] Archivo .env ya existe
)

echo.
echo ================================================================
echo   ¡Iniciando aplicacion!
echo ================================================================
echo.

REM Start backend
echo [*] Iniciando backend (FastAPI)...
call backend\venv\Scripts\activate.bat
start "bustaTv Backend" cmd /k "cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak

REM Start frontend
echo [*] Iniciando frontend (Vite)...
start "bustaTv Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak

echo.
echo ================================================================
echo   ¡bustaTv esta listo!
echo ================================================================
echo.
echo [OK] Accede aqui:  http://localhost:5173
echo.
echo     API Backend:     http://localhost:8000
echo     API Docs:        http://localhost:8000/docs
echo.
echo Para detener la aplicacion, cierra las ventanas de comando.
echo.
pause
