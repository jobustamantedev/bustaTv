# 🚀 Inicio Rápido - localTv

## ⚡ 5 minutos para tener localTv corriendo

### 1️⃣ Instalación (Una sola vez)

```bash
cd localTv
bash scripts/install.sh
```

Eso es todo. El script instala:
- ✅ Entorno virtual de Python
- ✅ Dependencias backend (FastAPI, SQLAlchemy, etc.)
- ✅ Dependencias frontend (React, Vite, etc.)
- ✅ Archivos de configuración (.env)

### 2️⃣ Iniciar la aplicación

```bash
bash scripts/start.sh
```

El script te mostrará:
```
✅ localTv está corriendo!

📍 URLs de Acceso Local:
   Frontend:    http://localhost:5173
   Backend API: http://localhost:8000

📍 URLs de Acceso Remoto (TV, otros dispositivos):
   Frontend:    http://192.168.1.29:5173
   Backend API: http://192.168.1.29:8000
```

### 3️⃣ Abre la app

- **Desde tu PC:** http://localhost:5173
- **Desde tu TV:** Usa la IP que muestra el script (ej: http://192.168.1.29:5173)

---

## 📺 Acceso desde TV

1. Ejecuta `bash scripts/start.sh` en tu PC
2. Anota la IP que aparece (ej: `192.168.1.29`)
3. En tu TV, abre: `http://192.168.1.29:5173`
4. **¡Listo!** Ahora tienes toda la app en tu TV

---

## 🎯 Funciones principales

### Pestaña "Canales" 📺
- Lista de 100+ canales disponibles
- Busca por nombre
- Haz clic para reproducir

### Pestaña "Eventos" 🎥 **(NUEVO)**
- Eventos deportivos del día
- Agrupados por competición (NBA, Copa Libertadores, etc.)
- Busca por equipo, competición o stream
- Haz clic en los badges para cargar el canal

### Panel Admin 🔧
- URL: http://localhost:5173/admin
- API Key: `bustatv-dev-secret-key-changeme`
- Gestiona canales (crear, editar, eliminar)

---

## 🛠️ Solución de problemas

### "Error: fetch failed" desde TV
```bash
# Reinicia con el script start.sh
bash scripts/start.sh
# Verifica que muestre la IP correcta
```

### Python no encontrado
```bash
# Instala Python 3.9+
# macOS: brew install python3
# Ubuntu: sudo apt install python3
# Windows: descarga desde python.org
```

### Node.js no encontrado
```bash
# Instala Node.js 18+
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: descarga desde nodejs.org
```

### Puerto ya en uso
```bash
# Si el puerto 5173 o 8000 está ocupado:
# Detén el servicio que lo usa o usa un puerto diferente

# Para cambiar el puerto del frontend:
cd frontend
npm run dev -- --port 3000
```

---

## 📖 Documentación completa

Ver `README.md` para:
- Instalación manual
- Configuración detallada
- Desarrollo y contribuciones
- Notas de seguridad

---

## ⌨️ Comandos útiles

```bash
# Instalar (una sola vez)
bash scripts/install.sh

# Iniciar todo (recomendado)
bash scripts/start.sh

# Backend solo (terminal 1)
cd backend && source venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0

# Frontend solo (terminal 2)
cd frontend && npm run dev -- --host

# Ver documentación API
open http://localhost:8000/docs
```

---

**¿Listo?** Ejecuta `bash scripts/install.sh` y luego `bash scripts/start.sh` 🎉
