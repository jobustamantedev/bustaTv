# Ejecutar bustaTv en Docker

## Requisitos

- **Docker Desktop** instalado y corriendo
  - macOS: https://www.docker.com/products/docker-desktop
  - Windows: https://www.docker.com/products/docker-desktop
  - Linux: `sudo apt-get install docker.io docker-compose`

## ¿Docker no está corriendo?

### macOS/Windows
1. Abre **Docker Desktop** (búscalo en Aplicaciones o Program Files)
2. Espera a que esté completamente iniciado (icono en la barra superior/bandeja del sistema)
3. Luego ejecuta:
   ```bash
   cd /Users/jobustamantedev/Projects/bustaTv
   docker-compose up --build
   ```

### Linux
```bash
sudo systemctl start docker
docker-compose up --build
```

## Alternativa: Ejecutar Localmente sin Docker

Si no quieres instalar/usar Docker, puedes ejecutar en modo desarrollo:

### Terminal 1 - Backend
```bash
cd /Users/jobustamantedev/Projects/bustaTv/backend
source venv/bin/activate
uvicorn main:app --reload
```

### Terminal 2 - Frontend
```bash
cd /Users/jobustamantedev/Projects/bustaTv/frontend
npm run dev
```

Luego accede a **http://localhost:5173**

## Una vez Docker esté corriendo

```bash
cd /Users/jobustamantedev/Projects/bustaTv
docker-compose up --build
```

Accede a:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Admin**: http://localhost:5173/admin (API key: `bustatv-dev-secret-key-changeme`)

## Troubleshooting

### "Cannot connect to Docker daemon"
- Asegúrate de que Docker Desktop está corriendo
- Reinicia Docker Desktop si es necesario

### "Port 5173 already in use"
```bash
# Mata el proceso que usa el puerto
lsof -ti:5173 | xargs kill -9
```

### "Port 8000 already in use"
```bash
lsof -ti:8000 | xargs kill -9
```

### Ver logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Detener contenedores
```bash
docker-compose down
```

### Limpiar todo (incluyendo volúmenes)
```bash
docker-compose down -v
```
