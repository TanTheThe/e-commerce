from typing import Optional, List
from pydantic import BaseModel, Field
import uuid
from src.schemas.product_variant import ProductVariantModel, ProductVariantCreateModel, ProductVariantUpdateModel


class ProductModel(BaseModel):
    id: uuid.UUID
    name: str
    images: List[str]
    description: Optional[str]
    status: str = Field(default="active")
    categories_id: List[uuid.UUID]
    product_variant: List[ProductVariantModel]


class ProductCreateModel(BaseModel):
    name: str
    images: List[str]
    description: Optional[str] = None
    categories_id: List[uuid.UUID]
    product_variant: List[ProductVariantCreateModel]

class ProductUpdateModel(BaseModel):
    name: str = None
    images: List[str] = None
    description: Optional[str] = None
    status: str = Field(default="active")
    categories_id: List[uuid.UUID] = None
    product_variant: List[ProductVariantUpdateModel] = None