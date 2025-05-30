from datetime import datetime
from typing import Optional
from sqlalchemy import ColumnElement
from src.database.models import User
from src.crud.authentication.utils import generate_password_hash
from sqlmodel import select, desc
from sqlmodel.ext.asyncio.session import AsyncSession

class UserRepository:
    async def get_user(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(User).where(conditions)
        result = await session.exec(statement)

        return result.first()


    async def get_all_user(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(User).order_by(desc(User.created_at))
        if conditions:
            statement = statement.where(conditions)

        result = await session.exec(statement)
        return result.all()


    async def update_user(self, data_need_update, update_data: dict, session: AsyncSession):
        for k, v in update_data.items():
            setattr(data_need_update, k, v)

        data_need_update.updated_at = datetime.now()

        return data_need_update


    async def create_user(self, user_data, session: AsyncSession):
        user_data_dict = user_data.model_dump()

        new_user = User(
            **user_data_dict,
            password=generate_password_hash(user_data_dict['password']),
            customer_status="active",
            created_at=datetime.now()
        )
        session.add(new_user)
        await session.commit()

        return new_user