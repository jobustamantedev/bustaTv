#!/bin/bash

# localTv Startup Script
# Inicia backend y frontend simultáneamente con acceso remoto

set -e

echo "🚀 Iniciando localTv..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del proyecto localTv"
    exit 1
fi

# Función para manejar CTRL+C
cleanup() {
    echo ""
    echo "⏹️  Deteniendo servicios..."
    kill %1 2>/dev/null || true
    kill %2 2>/dev/null || true
    wait
    echo "✅ localTv detenido"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Obtener IP local
LOCAL_IP=$(ifconfig | grep -E "inet " | grep -v "127.0.0.1" | head -1 | awk '{print $2}' || echo "localhost")

# Iniciar Backend
echo "📡 Backend: Iniciando en http://localhost:8000 (acceso remoto: http://$LOCAL_IP:8000)"
(cd backend && source venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000) &
BACKEND_PID=$!

# Dar tiempo al backend para iniciar
sleep 3

# Iniciar Frontend
echo "🎨 Frontend: Iniciando en http://localhost:5173 (acceso remoto: http://$LOCAL_IP:5173)"
(cd frontend && npm run dev -- --host) &
FRONTEND_PID=$!

echo ""
echo "✅ localTv está corriendo!"
echo ""
echo "📍 URLs de Acceso Local:"
echo "   Frontend:    http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   Swagger UI:  http://localhost:8000/docs"
echo ""
echo "📍 URLs de Acceso Remoto (TV, otros dispositivos):"
echo "   Frontend:    http://$LOCAL_IP:5173"
echo "   Backend API: http://$LOCAL_IP:8000"
echo ""
echo "🔑 API Key (para Admin): bustatv-dev-secret-key-changeme"
echo ""
echo "Presiona CTRL+C para detener los servicios"
echo ""

# Esperar a que ambos procesos terminen
wait
