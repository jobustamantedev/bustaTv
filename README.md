# localTv

Una plataforma web de streaming de contenido en vivo, similar a Míralo TV.

## 📋 Descripción

localTv es un agregador web de streams de contenido en vivo. Permite visualizar múltiples canales de TV, filtrar por categorías y acceder a un panel administrativo para gestionar los canales disponibles.

## 🎯 Características

- ✅ Interfaz web responsive y moderna
- ✅ Lista de canales en vivo (10+ canales predefinidos)
- ✅ Filtrado por categorías (Deportes, Películas, Series, Noticias, etc.)
- ✅ Panel administrativo para gestionar canales
- ✅ Indicadores de estado EN VIVO / Offline
- ✅ API REST completamente documentada (Swagger UI)

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
│   │   ├── pages/             # Páginas (Home, Admin)
│   │   ├── context/           # Context API
│   │   ├── services/          # Servicios HTTP
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilidades
│   │   ├── App.jsx            # Componente raíz
│   │   └── main.jsx           # Punto de entrada
│   ├── package.json           # Dependencias Node
│   ├── vite.config.js         # Config Vite
│   └── .env                   # Variables de entorno
│
├── docker-compose.yml         # Orquestación Docker
├── Dockerfile.backend         # Imagen Docker Backend
├── Dockerfile.frontend        # Imagen Docker Frontend
├── scripts/
│   └── start.sh              # Script de inicio
├── README.md                 # Este archivo
└── CLAUDE.md                 # Notas de desarrollo
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.5** - Librería UI
- **Vite 8.0.10** - Build tool y dev server
- **React Router DOM 7.14.2** - Enrutamiento
- **Clappr** - Reproductor de video HLS/DASH (opcional)

### Backend
- **FastAPI 0.111.0** - Framework web async
- **Uvicorn 0.30.0** - Servidor ASGI
- **SQLAlchemy 2.0.30** - ORM
- **SQLite** - Base de datos
- **Pydantic 2.7.0** - Validación de datos

### DevOps
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
git clone https://github.com/jobustamantedev/bustaTv.git
cd bustaTv
```

### 2. Instalación Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Instalación Frontend

```bash
cd frontend
npm install
```

## 🚀 Ejecución

### Opción 1: Script de Inicio (Recomendado)

Inicia backend y frontend simultáneamente desde la raíz del proyecto:

```bash
bash scripts/start.sh
```

### Opción 2: Manual en Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # En Windows: venv\Scripts\activate
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Opción 3: Docker Compose

```bash
docker-compose up
```

## 🌐 URLs de Acceso

Una vez iniciado el proyecto:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | Interfaz web principal |
| Backend API | http://localhost:8000 | API REST |
| API Docs | http://localhost:8000/docs | Documentación Swagger UI |
| Admin | http://localhost:5173/admin | Panel administrativo |

## 📖 Cómo Usar

### Home (Página Principal)

1. Abre http://localhost:5173 en tu navegador
2. Verás una lista de 10+ canales en vivo
3. Usa los filtros para buscar por categoría:
   - Filtro "Todos" - Muestra todos los canales
   - Filtro "Deportes" - Solo canales deportivos
   - Filtro "Películas" - Solo películas
   - Otros filtros disponibles
4. Haz clic en un canal para ver sus detalles
5. Los indicadores muestran:
   - 🔴 EN VIVO - Canal transmitiendo
   - ⚪ Offline - Canal no disponible

### Panel Administrativo

1. Navega a http://localhost:5173/admin
2. Se te pedirá una clave API (API Key)
3. Ingresa: `bustatv-dev-secret-key-changeme`
4. En el panel administrativo puedes:
   - **Ver tabla** de todos los canales
   - **Crear canal** nuevo
   - **Editar canal** (nombre, URL, categoría)
   - **Activar/Desactivar** canal (toggle on/off)
   - **Eliminar canal**

### API REST

Algunos endpoints útiles:

```bash
# Health check
curl http://localhost:8000/health

# Obtener todos los canales
curl http://localhost:8000/api/channels

# Obtener categorías
curl http://localhost:8000/api/categories

# Ver documentación interactiva
open http://localhost:8000/docs
```

## 🧪 Testing Manual E2E

Después de ejecutar `bash scripts/start.sh`:

### Frontend Checks

- [ ] Navbar rojo aparece en la parte superior
- [ ] Título "bustaTv" visible
- [ ] Lista de 10+ canales se carga
- [ ] Al hacer clic en un canal (ej. ESPN), cambia la selección
- [ ] Filtros funcionan (clic en "Deportes", "Todos")
- [ ] Indicadores 🔴 EN VIVO y ⚪ Offline son correctos
- [ ] Layout es responsive (prueba con DevTools mobile)

### Admin Panel Checks

- [ ] Ir a /admin → se pide API key
- [ ] Ingresar: `bustatv-dev-secret-key-changeme`
- [ ] Dashboard muestra tabla con canales
- [ ] Botón "Crear Canal" funciona
- [ ] Editar canal (actualiza nombre, categoría, etc.)
- [ ] Toggle on/off activa/desactiva canales
- [ ] Botón eliminar funciona

### Backend Checks

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

### Console & Network Checks (DevTools)

- [ ] Console tab: SIN errores rojos
- [ ] Network tab: requests exitosos (200, 201, 204)
- [ ] Network tab: SIN requests fallidas (4xx, 5xx)
- [ ] Backend logs: SIN errores o excepciones

## 📝 Variables de Entorno

### Backend (`.env`)

```
DATABASE_URL=sqlite:///./bustaTv.db
SECRET_API_KEY=bustatv-dev-secret-key-changeme
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:8000
```

## 🔒 Nota sobre Seguridad

Este proyecto está en desarrollo. Para producción:

- [ ] Cambiar `SECRET_API_KEY` a algo seguro
- [ ] Configurar CORS adecuadamente
- [ ] Usar HTTPS
- [ ] Implementar autenticación con tokens JWT
- [ ] Validar y sanitizar todas las entradas
- [ ] Usar variables de entorno seguras

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

- [GitHub](https://github.com/jobustamantedev/bustaTv)
- [Documentación de Desarrollo](./CLAUDE.md)
- [Especificaciones](./specs)

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0 - Fase 5: Integración y Pruebas Completada
