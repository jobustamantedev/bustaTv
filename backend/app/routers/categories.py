from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import categories as crud_categories
from app.schemas.category import CategoryRead

router = APIRouter(prefix="/api/categories", tags=["categories"])

@router.get("/", response_model=list[CategoryRead])
def read_categories(db: Session = Depends(get_db)):
    return crud_categories.get_categories(db)
