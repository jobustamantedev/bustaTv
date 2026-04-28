# 🚀 bustaTv - Setup Automático

¡Bienvenido! Esta guía te ayudará a ejecutar bustaTv en tu computadora con solo unos pocos clics.

## 📋 Requisitos Previos

Antes de empezar, necesitas tener instalado:

### Para Mac/Linux:
- **Homebrew** (si no lo tienes, se instalará automáticamente)

### Para Windows:
- **Python 3.9+** - Descargalo desde: https://www.python.org/downloads/
  - ⚠️ **IMPORTANTE**: Al instalar, marca la opción **"Add Python to PATH"**
- **Node.js 18+** - Descargalo desde: https://nodejs.org/

## 🎯 Instalación Rápida

### En Mac/Linux:

1. Abre la Terminal
2. Ve a la carpeta del proyecto:
   ```bash
   cd /ruta/a/bustaTv
   ```
3. Dale permisos al script:
   ```bash
   chmod +x setup.sh
   ```
4. Ejecuta el script:
   ```bash
   ./setup.sh
   ```

El script hará automáticamente:
- ✅ Instalar Python (si no está)
- ✅ Instalar Node.js (si no está)
- ✅ Instalar todas las dependencias
- ✅ Crear archivos de configuración
- ✅ Ejecutar el backend y frontend
- ✅ Mostrar la URL donde acceder

### En Windows:

1. Asegúrate de tener Python y Node.js instalados
2. Busca el archivo `setup.bat` en la carpeta del proyecto
3. **Haz doble clic** en `setup.bat`
4. Espera a que se abran dos ventanas de comando

El script hará automáticamente todo lo anterior.

## 🌐 Acceder a la Aplicación

Una vez que se complete la instalación, verás un mensaje como este:

```
================================================================
   ¡bustaTv está listo!
================================================================

Accede aquí:  http://localhost:5173

    API Backend:     http://localhost:8000
    API Docs:        http://localhost:8000/docs
```

**Abre tu navegador y ve a:** `http://localhost:5173`

¡Ya puedes ver todos los canales disponibles! 📺

## ✨ Funciones Principales

- **Ver canales en vivo** - Una lista completa de canales en streaming
- **Favoritos** - Guarda tus canales preferidos (se guardan automáticamente)
- **Búsqueda** - Encuentra rápidamente el canal que buscas
- **Seleccionar canal** - Haz clic en cualquier canal para verlo

## 🛑 Detener la Aplicación

### En Mac/Linux:
Presiona **Ctrl+C** en la Terminal para detener todo.

### En Windows:
Cierra las dos ventanas de comando que se abrieron.

## 🐛 Si Algo Falla

### "Python no está instalado"
**Mac/Linux:** El script intentará instalarlo automáticamente con Homebrew.
**Windows:** Descárgalo desde https://www.python.org/downloads/ y marca "Add Python to PATH"

### "Node.js no está instalado"
**Mac/Linux:** El script intentará instalarlo automáticamente con Homebrew.
**Windows:** Descárgalo desde https://nodejs.org/

### "No puedo acceder a http://localhost:5173"
1. Espera 10 segundos a que el frontend se inicie completamente
2. Actualiza la página (F5 o Cmd+R)
3. Verifica que las dos ventanas de comando aún estén abiertas

### Los logs muestran errores
Mira los archivos de log en:
- **Backend:** `/tmp/bustatv_backend.log` (Mac/Linux)
- **Frontend:** `/tmp/bustatv_frontend.log` (Mac/Linux)

## 📁 Estructura del Proyecto

```
bustaTv/
├── backend/          # API FastAPI
├── frontend/         # Interfaz React
├── setup.sh          # Script para Mac/Linux
├── setup.bat         # Script para Windows
└── SETUP.md          # Esta guía
```

## 🎓 Para Desarrolladores

Si quieres hacer cambios:

### Cambios en el Backend:
El backend se reinicia automáticamente cuando cambias código (modo --reload)

### Cambios en el Frontend:
El frontend se recarga automáticamente en el navegador (Vite HMR)

## 📞 Ayuda

Si tienes problemas:
1. Verifica que Python y Node.js estén instalados
2. Intenta eliminar `node_modules` en frontend y vuelve a ejecutar el script
3. Intenta eliminar `venv` en backend y vuelve a ejecutar el script

## 📝 Notas

- La base de datos se crea automáticamente la primera vez
- Los favoritos se guardan en el navegador (localStorage)
- Puedes acceder a la documentación interactiva de la API en: http://localhost:8000/docs

---

**¡Que disfrutes de bustaTv!** 📺✨
