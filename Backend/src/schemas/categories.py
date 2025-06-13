from pydantic import BaseModel
import uuid
from typing import Optional

class CategoriesModel(BaseModel):
    id: uuid.UUID
    name: str
    images: str


class CategoriesCreateModel(BaseModel):
    name: str
    images: str

class CategoriesUpdateModel(BaseModel):
    name: Optional[str] = None
    images: Optional[str] = None