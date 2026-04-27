from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate

def get_categories(db: Session):
    return db.query(Category).all()

def get_category_by_slug(db: Session, slug: str):
    return db.query(Category).filter(Category.slug == slug).first()

def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
