# localTv

Una plataforma web de streaming de contenido en vivo con eventos deportivos integrados, accesible desde cualquier dispositivo en tu red.

## 📋 Descripción

localTv es un agregador web de streams de contenido en vivo que permite visualizar múltiples canales de TV, filtrar por categorías, ver eventos del día y acceder a un panel administrativo para gestionar los canales. Diseñado para ser accesible desde Smart TVs, tablets y otros dispositivos en tu red local.

## 🎯 Características

- ✅ Interfaz web limpia y centrada en el contenido
- ✅ Lista de canales en vivo (100+ canales disponibles)
- ✅ Búsqueda de canales por nombre
- ✅ **Sección de Eventos** con competiciones agrupadas (NBA, Copa Libertadores, etc.)
- ✅ Búsqueda de eventos por competición, equipo o stream
- ✅ Integración con API de eventos en vivo (pltvhd.com)
- ✅ Badges de streams clicables que cargan el canal
- ✅ Indicadores de estado EN VIVO / Offline
- ✅ API REST completamente documentada (Swagger UI)
- ✅ **Acceso remoto desde cualquier dispositivo** (TV, tablet, otra PC)
- ✅ Panel administrativo para gestionar canales

## 🏗️ Arquitectura

```
localTv/
├── backend/                    # API FastAPI + SQLite
│   ├── app/
│   │   ├── models/            # Modelos de datos
│   │   ├── schemas/           # Schemas Pydantic
│   │   ├── routers/           # Endpoints
│   │   ├── crud/              # Operaciones de BD
│   │   ├── auth.py            # Autenticación
│   │   ├── config.py          # Configuración
│   │   └── database.py        # Conexión BD
│   ├── scripts/               # Scripts de utilidad
│   ├── main.py                # Aplicación principal
│   ├── requirements.txt        # Dependencias Python
│   └── .env                   # Variables de entorno
│
├── frontend/                   # Interfaz React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── SidebarWithTabs/
│   │   │   ├── DailyEvents/   # NEW: Sección de eventos
│   │   │   └── ...
│   │   ├── pages/             # Páginas (Home, ChannelPage)
│   │   ├── context/           # Context API
│   │   ├── services/          # Servicios HTTP
│   │   ├── App.jsx            # Componente raíz
│   │   └── main.jsx           # Punto de entrada
│   ├── package.json           # Dependencias Node
│   ├── vite.config.js         # Config Vite
│   └── .env                   # Variables de entorno
│
├── docker-compose.yml         # Orquestación Docker
├── scripts/
│   └── start.sh              # Script de inicio (MEJORADO)
├── README.md                 # Este archivo
├── CLAUDE.md                 # Notas de desarrollo
└── LICENSE                   # MIT License
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.5** - Librería UI moderna
- **Vite 8.0.10** - Build tool ultra-rápido
- **React Router DOM 7.14.2** - Enrutamiento cliente
- **CSS Modules** - Estilos aislados por componente

### Backend
- **FastAPI 0.111.0** - Framework web async
- **Uvicorn 0.30.0** - Servidor ASGI de alto rendimiento
- **SQLAlchemy 2.0.30** - ORM para bases de datos
- **SQLite** - Base de datos ligera
- **Pydantic 2.7.0** - Validación de datos con tipos

### DevOps & Acceso Remoto
- **Docker & Docker Compose** - Containerización
- **Python 3.9+** - Runtime backend
- **Node.js 18+** - Runtime frontend

## 📦 Instalación

### Requisitos Previos
- Python 3.9+ con pip
- Node.js 18+ con npm
- Git

### 1. Clonar Repositorio

```bash
git clone https://github.com/jobustamantedev/localTv.git
cd localTv
```

### 2. Instalación Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 3. Instalación Frontend

```bash
cd frontend
npm install
cd ..
```

## 🚀 Ejecución

### ⭐ Opción 1: Script de Inicio (RECOMENDADO)

Inicia backend y frontend automáticamente CON acceso remoto:

```bash
bash scripts/start.sh
```

**Salida esperada:**
```
✅ localTv está corriendo!

📍 URLs de Acceso Local:
   Frontend:    http://localhost:5173
   Backend API: http://localhost:8000

📍 URLs de Acceso Remoto (TV, otros dispositivos):
   Frontend:    http://192.168.1.29:5173
   Backend API: http://192.168.1.29:8000
```

### Opción 2: Manual en Terminales Separadas

**Terminal 1 - Backend (escucha en todas las interfaces):**
```bash
cd backend
source venv/bin/activate  # En Windows: venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend (escucha en todas las interfaces):**
```bash
cd frontend
npm run dev -- --host
```

### Opción 3: Docker Compose

```bash
docker-compose up
```

## 🌐 URLs de Acceso

| Servicio | Local | Remoto | Descripción |
|----------|-------|--------|-------------|
| Frontend | http://localhost:5173 | http://`<TU_IP>`:5173 | Interfaz web principal |
| Backend API | http://localhost:8000 | http://`<TU_IP>`:8000 | API REST |
| API Docs | http://localhost:8000/docs | http://`<TU_IP>`:8000/docs | Documentación Swagger |

> `<TU_IP>` es tu dirección IP local. El script `start.sh` la calcula automáticamente.

## 📖 Cómo Usar

### 🏠 Página Principal

1. Abre http://localhost:5173 (o la URL remota desde tu TV)
2. Verás el reproductor de video en el centro
3. A la derecha hay un **sidebar con dos tabs**:

#### Tab "Canales" 📺
- Lista de todos los canales disponibles (100+)
- **Barra de búsqueda** para filtrar por nombre
- Haz clic en un canal para reproducirlo
- El título del canal se muestra arriba del video
- El indicador **🔴 EN VIVO** se muestra abajo

#### Tab "Eventos" 🎥 **(NUEVO)**
- Eventos deportivos del día agrupados por **competición** (NBA, Copa Libertadores, etc.)
- Logo de cada competición visible
- **Barra de búsqueda** para encontrar eventos
- Busca por:
  - Nombre de la competición
  - Descripción del evento (equipos, participantes)
  - Nombre del stream (ESPN, Fox Sports, etc.)
- **Haz clic en los badges** de streams para cargar ese canal automáticamente
- Horarios de los eventos mostrados

### 🔧 Panel Administrativo

1. Navega a http://localhost:5173/admin
2. Ingresa la API Key: `bustatv-dev-secret-key-changeme`
3. Puedes:
   - **Ver tabla** de todos los canales
   - **Crear canal** nuevo
   - **Editar canal** (nombre, URL, categoría, estado)
   - **Activar/Desactivar** canal
   - **Eliminar canal**

### 📡 API REST

Algunos endpoints útiles:

```bash
# Health check
curl http://localhost:8000/health

# Obtener todos los canales
curl http://localhost:8000/api/channels

# Obtener categorías
curl http://localhost:8000/api/categories

# Ver documentación interactiva
open http://localhost:8000/docs  # macOS
# o en Windows/Linux: abre http://localhost:8000/docs en tu navegador
```

## 🖥️ Acceso Remoto desde TV

### Paso 1: Ejecutar el servidor

```bash
bash scripts/start.sh
```

El script te mostrará la IP local automáticamente:

```
📍 URLs de Acceso Remoto (TV, otros dispositivos):
   Frontend:    http://192.168.1.29:5173
```

### Paso 2: Acceder desde la TV

1. En tu Smart TV, abre el navegador web
2. Escribe: `http://192.168.1.29:5173` (usa tu IP)
3. La app cargará completamente

### ⚠️ Si no funciona:
- Verifica que tu TV y PC están en la **misma red WiFi**
- Verifica la IP: es la que muestra el script `start.sh`
- Si el backend da error "fetch failed":
  - Asegúrate de que `--host 0.0.0.0` está activo en el backend
  - Reinicia con el script `start.sh`

## 🧪 Testing Manual E2E

Después de ejecutar `bash scripts/start.sh`:

### ✅ Frontend Checks

- [ ] Frontend carga sin navbar (sin logo ni menú arriba)
- [ ] Titulo del canal visible arriba del video (centrado)
- [ ] Video player centrado en la pantalla
- [ ] "🔴 EN VIVO" visible abajo del video (centrado)
- [ ] Sidebar derecho con dos tabs: "Canales" y "Eventos"
- [ ] Al hacer clic en "Canales" → muestra lista de canales
- [ ] Al hacer clic en "Eventos" → muestra eventos agrupados por competición
- [ ] Búsqueda en "Canales" filtra por nombre
- [ ] Búsqueda en "Eventos" filtra por competición/equipo/stream
- [ ] Al hacer clic en un canal → reproduce
- [ ] Al hacer clic en un badge de stream en eventos → carga el canal
- [ ] Layout es responsive (prueba con DevTools mobile)

### ✅ Admin Panel Checks

- [ ] Ir a /admin → se pide API key
- [ ] Ingresar: `bustatv-dev-secret-key-changeme`
- [ ] Dashboard muestra tabla con canales
- [ ] Botón "Crear Canal" funciona
- [ ] Editar canal (actualiza nombre, categoría, etc.)
- [ ] Toggle on/off activa/desactiva canales
- [ ] Botón eliminar funciona

### ✅ Backend Checks

```bash
# Health endpoint
curl http://localhost:8000/health
# Debe retornar: {"status":"ok"}

# Channels endpoint
curl http://localhost:8000/api/channels
# Debe retornar lista de canales en JSON

# Swagger UI
# Accede a http://localhost:8000/docs
```

### ✅ Acceso Remoto Checks

- [ ] Desde TV/otro dispositivo: http://`<IP>`:5173 carga la app
- [ ] Desde TV: Los canales se cargan sin errores
- [ ] Desde TV: Los eventos se cargan sin errores
- [ ] Desde TV: Puedo hacer clic en canales y eventos
- [ ] Console (DevTools): SIN errores de "fetch failed"

## 📝 Variables de Entorno

### Backend (`.env`)

```
DATABASE_URL=sqlite:///./localTv.db
SECRET_API_KEY=bustatv-dev-secret-key-changeme
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:8000
```

> **Nota:** Con acceso remoto, la URL se detecta automáticamente.

## 🔒 Nota sobre Seguridad

Este proyecto está en desarrollo. Para producción:

- [ ] Cambiar `SECRET_API_KEY` a algo seguro
- [ ] Configurar CORS según dominio específico
- [ ] Usar HTTPS
- [ ] Implementar autenticación con tokens JWT
- [ ] Validar y sanitizar todas las entradas
- [ ] Usar variables de entorno seguras
- [ ] No exponer la API a internet sin autenticación

## ⚠️ Notas Legales

Este proyecto es **solo para fines educativos**. 

Asegúrate de:
- Tener permisos para usar/distribuir cualquier contenido
- Cumplir con los términos de servicio de plataformas externas
- Respetar derechos de autor y propiedad intelectual
- Verificar regulaciones locales sobre streaming

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit los cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 👨‍💻 Autor

Jorge Bustamante ([@jobustamantedev](https://github.com/jobustamantedev))

## 📄 Licencia

MIT License - Ver LICENSE para detalles

## 🔗 Enlaces

- [GitHub](https://github.com/jobustamantedev/localTv)
- [Documentación de Desarrollo](./CLAUDE.md)
- [Especificaciones](./specs)

---

**Última actualización**: Abril 2026  
**Versión**: 2.0.0 - Eventos integrados + Acceso remoto  
**Estado**: Fase 6: Optimización y acceso remoto completado
