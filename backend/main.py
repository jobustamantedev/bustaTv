from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import channels, categories

# Crear tablas en la BD
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="bustaTv API",
    description="API para la plataforma de streaming bustaTv",
    version="1.0.0",
)

# CORS para React dev server
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

# Routers
app.include_router(channels.router)
app.include_router(categories.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "bustaTv API v1.0"}
