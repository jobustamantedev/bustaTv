#!/bin/bash

# localTv Installation Script
# Instala todas las dependencias automáticamente

set -e

echo "📦 Instalador automático de localTv"
echo "===================================="
echo ""

# Verificar requisitos previos
echo "✅ Verificando requisitos..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 no encontrado. Por favor instala Python 3.9 o superior"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js no encontrado. Por favor instala Node.js 18 o superior"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm no encontrado. Por favor instala npm"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
NODE_VERSION=$(node --version | sed 's/v//')
NPM_VERSION=$(npm --version)

echo "   Python: $PYTHON_VERSION ✓"
echo "   Node.js: $NODE_VERSION ✓"
echo "   npm: $NPM_VERSION ✓"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del proyecto localTv"
    exit 1
fi

echo "📂 Directorio correcto detectado"
echo ""

# Instalar Backend
echo "📥 Instalando Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "   Creando entorno virtual..."
    python3 -m venv venv
fi

echo "   Activando entorno virtual..."
source venv/bin/activate

echo "   Instalando dependencias Python..."
pip install --upgrade pip > /dev/null
pip install -r requirements.txt > /dev/null

echo "   ✅ Backend instalado"
cd ..

# Instalar Frontend
echo ""
echo "📥 Instalando Frontend..."
cd frontend

echo "   Instalando dependencias Node..."
npm install > /dev/null

echo "   ✅ Frontend instalado"
cd ..

# Crear archivo .env si no existe
echo ""
echo "⚙️  Configurando variables de entorno..."

if [ ! -f "backend/.env" ]; then
    echo "   Creando backend/.env..."
    cat > backend/.env << 'EOF'
DATABASE_URL=sqlite:///./localTv.db
SECRET_API_KEY=bustatv-dev-secret-key-changeme
EOF
    echo "   ✅ backend/.env creado"
else
    echo "   backend/.env ya existe"
fi

if [ ! -f "frontend/.env" ]; then
    echo "   Creando frontend/.env..."
    cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:8000
EOF
    echo "   ✅ frontend/.env creado"
else
    echo "   frontend/.env ya existe"
fi

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "🚀 Para iniciar la aplicación, ejecuta:"
echo "   bash scripts/start.sh"
echo ""
echo "📖 Para más información, lee el README.md"
echo ""
