from typing import Optional
from pydantic import BaseModel
import uuid


class EvaluateModel(BaseModel):
    id: uuid.UUID
    comment: Optional[str]
    rate: int
    image: str
    product_id: uuid.UUID
    order_detail_id: uuid.UUID


class EvaluateInputModel(BaseModel):
    comment: Optional[str]
    rate: int
    image: str
    order_detail_id: str


class EvaluateCreateModel(BaseModel):
    comment: Optional[str]
    rate: int
    image: str
    order_detail_id: str
    product_id: str
    product_variant_id: str
    user_id: str


class EvaluateReadModel(BaseModel):
    comment: Optional[str]
    rate: int
    image: str