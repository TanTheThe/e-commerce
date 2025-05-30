from typing import Optional
from sqlalchemy import ColumnElement
from src.database.models import Product
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime
from fastapi import HTTPException, status


class ProductRepository:
    async def create_product(self, product_data, session: AsyncSession):
        product_data_dict = product_data.model_dump(exclude={"categories_id", "product_variant"})

        new_product = Product(
            **product_data_dict
        )

        new_product.status = "active"
        new_product.created_at = datetime.now()

        session.add(new_product)
        await session.flush()

        return new_product


    async def get_all_product(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, joins: list = None, skip: int = 0, limit: int = 10):
        statement = select(Product).offset(skip).limit(limit).order_by(desc(Product.created_at))
        if conditions:
            statement = statement.where(conditions)
        if joins:
            statement = statement.options(*joins)

        result = await session.exec(statement)
        return result.all()


    async def get_product(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, joins: list = None):
        statement = select(Product).where(conditions)
        if joins:
            statement = statement.options(*joins)

        result = await session.exec(statement)

        return result.one_or_none()


    async def update_product(self, data_need_update, update_data: dict, session: AsyncSession):
        for k, v in update_data.items():
            if v is not None:
                setattr(data_need_update, k, v)

        data_need_update.updated_at = datetime.now()
        await session.commit()

        return data_need_update


    async def delete_product(self, condition: Optional[ColumnElement[bool]], session: AsyncSession):
        product_to_delete = await self.get_product(condition, session)

        if product_to_delete is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "message": "Không tìm thấy sản phẩm.",
                    "error_code": "product_006",
                },
            )
        product_to_delete.deleted_at = datetime.now()
        await session.commit()

        return {}








