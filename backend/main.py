from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.routers import channels, categories, streams, auth
from app.models.category import Category
from app.models.channel import Channel
from app.models.user import User

# Crear tablas en la BD
Base.metadata.create_all(bind=engine)

# Seed automático si no hay datos
def seed_db():
    db = SessionLocal()
    try:
        if db.query(Category).count() == 0:
            # Crear categorías
            categories_data = [
                Category(name="Deportes", slug="deportes", icon="fa-futbol"),
                Category(name="Reality", slug="reality", icon="fa-tv"),
            ]
            db.add_all(categories_data)
            db.flush()

            # Crear canales
            channels_data = [
                Channel(name="ESPN", slug="espn", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn", logo_url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png", category_id=1, is_active=True),
                Channel(name="ESPN 2", slug="espn2", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn2", logo_url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png", category_id=1, is_active=True),
                Channel(name="ESPN 3", slug="espn3", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn3", category_id=1, is_active=True),
                Channel(name="ESPN 4", slug="espn4", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn4", category_id=1, is_active=True),
                Channel(name="ESPN 5", slug="espn5", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn5", category_id=1, is_active=True),
                Channel(name="ESPN 6", slug="espn6", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn6", category_id=1, is_active=True),
                Channel(name="ESPN 7", slug="espn7", stream_url="https://tvtvhd.com/vivo/canales.php?stream=espn7", category_id=1, is_active=True),
                Channel(name="DSports", slug="dsports", stream_url="https://tvtvhd.com/vivo/canales.php?stream=dsports", logo_url="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DirectTV_Sports_logo.png/200px-DirectTV_Sports_logo.png", category_id=1, is_active=True),
                Channel(name="DSports+", slug="dsports-plus", stream_url="https://tvtvhd.com/vivo/canales.php?stream=dsportsplus", category_id=1, is_active=True),
                Channel(name="DSports 2", slug="dsports2", stream_url="https://tvtvhd.com/vivo/canales.php?stream=dsports2", category_id=1, is_active=True),
            ]
            db.add_all(channels_data)
            db.commit()
    finally:
        db.close()

seed_db()

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
        "http://localhost:5601",
        "http://127.0.0.1:5601",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(channels.router)
app.include_router(categories.router)
app.include_router(streams.router)
app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "bustaTv API v1.0"}
