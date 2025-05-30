from typing import Optional
from sqlalchemy import ColumnElement
from src.database.models import Special_Offer
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime
import time

from src.errors.special_offer import SpecialOfferException


class SpecialOfferRepository:
    async def create_special_offer(self, special_offer_data, session: AsyncSession):
        special_offer_data_dict = special_offer_data.model_dump()

        new_special_offer = Special_Offer(
            **special_offer_data_dict
        )
        new_special_offer.created_at = datetime.now()
        new_special_offer.code = str(int(time.time() * 1000))
        session.add(new_special_offer)
        await session.commit()

        return new_special_offer


    async def get_all_special_offer(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(Special_Offer).order_by(desc(Special_Offer.created_at))
        if conditions:
            statement = statement.where(conditions)

        result = await session.exec(statement)
        return result.all()


    async def get_special_offer(self, conditions: Optional[ColumnElement[bool]], session: AsyncSession):
        statement = select(Special_Offer).where(conditions)

        result = await session.exec(statement)

        return result.one_or_none()


    async def update_special_offer(self, data_need_update, update_data: dict, session: AsyncSession):
        for k, v in update_data.items():
            if v is not None:
                setattr(data_need_update, k, v)

        data_need_update.updated_at = datetime.now()

        await session.commit()

        return data_need_update


    async def delete_special_offer(self, condition: Optional[ColumnElement[bool]], session: AsyncSession):
        special_offer_to_delete = await self.get_special_offer(condition, session)

        if special_offer_to_delete is None:
            SpecialOfferException.not_found_to_delete()

        special_offer_to_delete.deleted_at = datetime.now()
        await session.commit()

        return {}



