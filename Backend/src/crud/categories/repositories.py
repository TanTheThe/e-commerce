from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy import ColumnElement
from src.database.models import Categories
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime
from src.errors.categories import CategoriesException


class CategoriesRepository:
    async def create_categories(self, categories_data, session: AsyncSession):
        categories_data_dict = categories_data.model_dump()

        new_categories = Categories(
            **categories_data_dict,
            created_at = datetime.now()
        )
        session.add(new_categories)
        await session.commit()

        return new_categories


    async def get_all_categories(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(Categories).order_by(desc(Categories.created_at))
        if conditions is not None:
            statement = statement.where(conditions)

        result = await session.exec(statement)
        return result.all()


    async def get_category(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(Categories).where(conditions)
        result = await session.exec(statement)

        return result.one_or_none()


    async def update_categories(self, data_need_update, update_data: dict, session: AsyncSession):
        for k, v in update_data.items():
            if v is not None:
                setattr(data_need_update, k, v)

        data_need_update.updated_at = datetime.now()

        return data_need_update


    async def delete_categories(self, condition: Optional[ColumnElement[bool]], session: AsyncSession):
        categories_to_delete = await self.get_categories(condition, session)

        if categories_to_delete is None:
            CategoriesException.not_found_to_delete()

        categories_to_delete.deleted_at = datetime.now()
        await session.commit()

        return {}



