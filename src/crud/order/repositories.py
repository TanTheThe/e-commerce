from typing import Optional
from sqlalchemy import ColumnElement
from src.database.models import Order
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime


class OrderRepository:
    async def create_order(self, order_data, session: AsyncSession):
        if not isinstance(order_data, dict):
            order_data_dict = order_data.model_dump(exclude_none=True)
        else:
            order_data_dict = order_data

        new_order = Order(
            **order_data_dict,
            status="Pending",
            created_at=datetime.now()
        )

        session.add(new_order)
        await session.flush()

        return new_order


    async def get_order(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, joins: list = None):
        statement = select(Order).where(conditions)
        if joins:
            statement = statement.options(*joins)

        result = await session.exec(statement)

        return result.one_or_none()


    async def get_all_order(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, skip: int = 0,
                              limit: int = 10):
        statement = select(Order).offset(skip).limit(limit).order_by(desc(Order.created_at))
        if conditions:
            statement = statement.where(conditions)

        result = await session.exec(statement)
        return result.all()


    async def update_order(self, data_need_update, update_data: dict, session: AsyncSession):
        for k, v in update_data.items():
            if v is not None:
                setattr(data_need_update, k, v)

        data_need_update.updated_at = datetime.now()
        await session.commit()

        return data_need_update







