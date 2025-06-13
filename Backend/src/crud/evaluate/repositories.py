from typing import Optional
from sqlalchemy import ColumnElement
from src.database.models import Evaluate
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime
from src.errors.evaluate import EvaluateException


class EvaluateRepository:
    async def create_evaluate(self, evaluate_data, session: AsyncSession):
        evaluate_data_dict = evaluate_data.model_dump()

        new_evaluate = Evaluate(
            **evaluate_data_dict,
            created_at=datetime.now()
        )
        session.add(new_evaluate)
        await session.commit()

        return new_evaluate


    async def get_all_evaluate(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, joins: list = None,
                               skip: int = 0, limit: int = 10):
        statement = select(Evaluate).offset(skip).limit(limit).order_by(desc(Evaluate.created_at))
        if conditions:
            statement = statement.where(conditions)
        if joins:
            statement = statement.options(*joins)

        result = await session.exec(statement)
        return result.all()


    async def get_evaluate(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession, joins: list = None):
        statement = select(Evaluate).where(conditions)
        if joins:
            statement = statement.options(*joins)

        result = await session.exec(statement)

        return result.one_or_none()


    async def delete_evaluate(self, condition: Optional[ColumnElement[bool]], session: AsyncSession):
        evaluate_delete = await self.get_evaluate(condition, session)

        if evaluate_delete is None:
            EvaluateException.review_not_found_to_delete()

        evaluate_delete.deleted_at = datetime.now()
        await session.commit()

        return {}
