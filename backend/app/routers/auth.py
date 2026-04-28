from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import users as crud_users
from app.schemas.user import UserCreate, UserLogin, UserResponse, UserRead
import jwt
import os
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/auth", tags=["auth"])

SECRET_KEY = os.getenv("SECRET_API_KEY", "bustatv-dev-secret-key-changeme")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    db_email = crud_users.get_user_by_email(db, user.email)
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = crud_users.create_user(db, user)
    access_token = create_access_token({"sub": new_user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_username(db, user.username)
    if not db_user or not crud_users.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": db_user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

@router.get("/me", response_model=UserRead)
def get_current_user(token: str = None, db: Session = Depends(get_db)):
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = crud_users.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
