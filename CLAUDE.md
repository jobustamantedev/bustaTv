# localTv Development Guide

## Project Overview

localTv is a web streaming platform for live TV content, built for educational purposes. It features a React frontend with Vite, a FastAPI backend, and SQLite database. This guide helps developers understand the project architecture and how to contribute.

**Status**: Phase 5 Complete - Integration, Testing, and Documentation Finalized

## Stack Tecnológico Final

### Frontend
- **React 19.2.5** - Modern UI library with hooks
- **Vite 8.0.10** - Lightning-fast build tool and dev server
- **React Router DOM 7.14.2** - Client-side routing
- **Clappr** - HLS/DASH video player (optional integration)
- **CSS3** - Styling with responsive design

### Backend
- **FastAPI 0.111.0** - Async web framework
- **Uvicorn 0.30.0** - ASGI application server
- **SQLAlchemy 2.0.30** - ORM for database
- **SQLite** - Lightweight relational database
- **Pydantic 2.7.0** - Data validation using Python type hints

### DevOps & Deployment
- **Docker** - Container images for backend and frontend
- **Docker Compose** - Orchestration of services
- **Python 3.9+** - Backend runtime
- **Node.js 18+** - Frontend runtime

## Architecture Overview

```
Client Browser (http://localhost:5173)
           ↓
       React App
    (Home + Admin)
           ↓
    HTTP/JSON API
    (CORS enabled)
           ↓
    FastAPI Backend
  (http://localhost:8000)
           ↓
       SQLite DB
   (localTv.db)
```

### Key Decisions

1. **React + Vite**: Fast development experience, modern tooling
2. **FastAPI**: Type-safe, auto-generated API docs (Swagger UI)
3. **SQLite**: Simple setup, no external dependencies
4. **Separate frontend/backend**: Clear separation of concerns, easy to deploy

## Project Structure

```
localTv/
├── backend/
│   ├── app/
│   │   ├── models/              # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── channel.py       # Channel model
│   │   │   └── category.py      # Category model
│   │   ├── schemas/             # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── channel.py
│   │   │   └── category.py
│   │   ├── routers/             # API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── channels.py      # /api/channels endpoints
│   │   │   └── categories.py    # /api/categories endpoints
│   │   ├── crud/                # Database operations
│   │   │   ├── __init__.py
│   │   │   ├── channels.py
│   │   │   └── categories.py
│   │   ├── __init__.py
│   │   ├── auth.py              # API key validation
│   │   ├── config.py            # Environment config
│   │   └── database.py          # DB session setup
│   ├── scripts/
│   │   ├── __init__.py
│   │   └── seed.py              # DB initialization/seeding
│   ├── main.py                  # FastAPI app initialization
│   ├── requirements.txt
│   ├── .env                     # Local env vars (not in git)
│   ├── .env.example             # Template for .env
│   ├── venv/                    # Virtual environment
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar/
│   │   │   ├── ChannelCard/
│   │   │   ├── CategoryFilter/
│   │   │   ├── ProtectedRoute/
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx
│   │   ├── context/             # React Context (global state)
│   │   │   └── ChannelContext.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useChannels.js
│   │   ├── services/            # API client
│   │   │   └── api.js
│   │   ├── utils/               # Helper functions
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── vite.config.js           # Vite configuration
│   ├── .env                     # Local env vars (not in git)
│   ├── .env.example             # Template for .env
│   ├── node_modules/            # Dependencies
│   ├── Dockerfile
│   └── .dockerignore
│
├── scripts/
│   └── start.sh                 # Development startup script
│
├── docs/                        # Documentation
├── specs/                       # Project specifications
│
├── .gitignore                   # Git ignore rules
├── docker-compose.yml           # Docker service orchestration
├── Dockerfile.backend           # Backend container image
├── Dockerfile.frontend          # Frontend container image
├── README.md                    # User documentation
├── CLAUDE.md                    # This file
└── .git/                        # Git repository
```

## Backend Development

### Adding a New Endpoint

1. **Create a model** in `app/models/`:
```python
from sqlalchemy import Column, String, Integer
from app.database import Base

class MyModel(Base):
    __tablename__ = "my_models"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
```

2. **Create a schema** in `app/schemas/`:
```python
from pydantic import BaseModel

class MyModelCreate(BaseModel):
    name: str

class MyModel(MyModelCreate):
    id: int
```

3. **Create CRUD operations** in `app/crud/`:
```python
from sqlalchemy.orm import Session
from app.models import MyModel

def create_item(db: Session, name: str):
    db_item = MyModel(name=name)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```

4. **Create router** in `app/routers/`:
```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter(prefix="/api/mymodels", tags=["mymodels"])

@router.post("/")
def create_mymodel(name: str, db: Session = Depends(get_db)):
    return crud.create_item(db, name)
```

5. **Include router** in `main.py`:
```python
from app.routers import mymodel
app.include_router(mymodel.router)
```

### API Authentication

The admin endpoints require an API key. Implementation:

```python
from fastapi import Header, HTTPException

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("SECRET_API_KEY"):
        raise HTTPException(status_code=403, detail="Invalid API key")
    return x_api_key
```

Use as dependency:
```python
@router.post("/channels", dependencies=[Depends(verify_api_key)])
def create_channel(...):
    ...
```

## Frontend Development

### State Management with Context API

The app uses React Context for global state management (no Redux needed):

```jsx
// ChannelContext.jsx - Create context
export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  
  return (
    <ChannelContext.Provider value={{ channels, setChannels }}>
      {children}
    </ChannelContext.Provider>
  );
};

// Usage in components
const MyComponent = () => {
  const { channels } = useContext(ChannelContext);
  return <div>{channels.map(ch => ...)}</div>;
};
```

### API Integration

Service layer pattern for API calls:

```javascript
// services/api.js
export const getChannels = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/channels`
  );
  return response.json();
};

// Usage in components
useEffect(() => {
  getChannels().then(setChannels);
}, []);
```

### Component Structure

```jsx
// Example component with best practices
import { useEffect, useState } from 'react';
import { getChannels } from '../services/api';
import './ChannelList.css';

export const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getChannels()
      .then(data => setChannels(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="channel-list">
      {channels.map(ch => (
        <div key={ch.id} className="channel-card">
          {ch.name}
        </div>
      ))}
    </div>
  );
};
```

### Styling Best Practices

- Use CSS modules or scoped CSS
- Follow BEM naming convention for classes
- Ensure responsive design with media queries
- Test in mobile view (DevTools)

## Running the Application

### Development Mode

**Option 1: Single Command**
```bash
bash scripts/start.sh
```

**Option 2: Separate Terminals**

Terminal 1:
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Terminal 2:
```bash
cd frontend
npm run dev
```

### Production Mode with Docker

```bash
docker-compose up --build
```

Access at http://localhost:5173

## Testing

### Manual E2E Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend compiles without errors
- [ ] Home page loads 10+ channels
- [ ] Channels list populated from API
- [ ] Category filters work
- [ ] Admin panel authenticates with API key
- [ ] CRUD operations in admin work
- [ ] No console errors (DevTools F12)
- [ ] No network errors (DevTools Network tab)
- [ ] Responsive on mobile devices

### API Testing with Swagger

Visit http://localhost:8000/docs to test endpoints interactively.

## Clappr Video Player Integration (Optional)

If adding video playback:

```jsx
import Clappr from '@clappr/core';

useEffect(() => {
  if (streamUrl) {
    const player = new Clappr.Player({
      source: streamUrl,
      parentId: '#player-container',
      plugins: [Clappr.Playback],
      mute: true,
      autoPlay: true,
    });
  }
}, [streamUrl]);
```

Note: Clappr requires HLS (m3u8) or DASH (mpd) stream URLs, not raw HTTP streams.

## Common Issues & Solutions

### Issue: CORS errors in browser console

**Solution**: Verify CORS config in `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Database locked error

**Solution**: SQLite is single-writer. In development, this shouldn't happen. If it does:
- Stop the server
- Delete `localTv.db`
- Restart

### Issue: "Module not found" in backend

**Solution**: Ensure virtual environment is activated:
```bash
source venv/bin/activate
```

### Issue: "Cannot find module" in frontend

**Solution**: Reinstall dependencies:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=sqlite:///./localTv.db
SECRET_API_KEY=bustatv-dev-secret-key-changeme
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000
```

For production, change `SECRET_API_KEY` to a secure random string and `VITE_API_URL` to your production domain.

## Deployment Guide

### Docker

```bash
# Build and run
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Environment

Update `.env` files before deploying:
- Backend: Use strong `SECRET_API_KEY`, correct `DATABASE_URL`
- Frontend: Set `VITE_API_URL` to production backend URL

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push to remote
git push -u origin feature/my-feature

# Create pull request on GitHub
```

## Useful Commands

```bash
# Backend
cd backend
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload
uvicorn main:app --reload --host 0.0.0.0  # Expose to network

# Frontend
cd frontend
npm install
npm run dev
npm run build
npm run preview

# Docker
docker-compose up
docker-compose down
docker-compose logs -f
docker-compose ps
docker-compose exec backend bash
docker-compose exec frontend bash
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI app initialization |
| `backend/app/database.py` | SQLAlchemy setup |
| `backend/app/auth.py` | API key validation |
| `frontend/src/App.jsx` | Root React component |
| `frontend/src/context/ChannelContext.jsx` | Global state |
| `frontend/src/services/api.js` | API client |
| `docker-compose.yml` | Service orchestration |
| `scripts/start.sh` | Development startup |

## Next Steps for Developers

1. **Feature Development**:
   - Create a feature branch
   - Add model/schema/router if needed
   - Update frontend components
   - Test manually
   - Create pull request

2. **Bug Fixes**:
   - Create issue branch
   - Reproduce the bug
   - Fix and test
   - Create pull request

3. **Documentation**:
   - Update README for user-facing changes
   - Update CLAUDE.md for architecture changes
   - Add code comments for complex logic

4. **Deployment**:
   - Test in Docker Compose locally
   - Update environment variables
   - Build and push Docker images
   - Deploy with docker-compose pull && docker-compose up -d

## Contact & Support

For questions about the codebase:
- Check existing issues and PRs
- Read the README.md and this guide
- Review the source code comments
- Consult the FastAPI and React documentation

## License

MIT License - See LICENSE file for details

---

**Last Updated**: April 2026  
**Project Status**: Phase 5 Complete - Production Ready  
**Maintainer**: Jorge Bustamante (@jobustamantedev)
