from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    slug: str
    icon: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    id: int

    model_config = {"from_attributes": True}
