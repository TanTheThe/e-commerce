from fastapi import HTTPException, status
from src.database.models import Special_Offer
from src.errors.special_offer import SpecialOfferException
from src.schemas.special_offer import SpecialOfferCreateModel, SpecialOfferUpdateModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from src.crud.special_offer.repositories import SpecialOfferRepository


special_offer_repository = SpecialOfferRepository()

class SpecialOfferService:
    async def create_special_offer_service(self, special_offer_data: SpecialOfferCreateModel, session: AsyncSession):
        new_special_offer = await special_offer_repository.create_special_offer(special_offer_data, session)

        new_special_offer_dict = {
            "code": new_special_offer.code,
            "name": new_special_offer.name,
            "discount": new_special_offer.discount,
            "condition": new_special_offer.condition,
            "type": new_special_offer.type,
            "total_quantity": new_special_offer.total_quantity,
            "start_time": str(new_special_offer.start_time),
            "end_time": str(new_special_offer.end_time),
        }

        return new_special_offer_dict


    async def get_all_special_offer_service(self, session: AsyncSession):
        special_offers = await special_offer_repository.get_all_special_offer(None, session)

        if len(special_offers) == 0:
            SpecialOfferException.empty_list()

        return special_offers


    async def update_special_offer_service(self, id: str, special_offer_update: SpecialOfferUpdateModel, session: AsyncSession):
        condition = and_(Special_Offer.id == id)
        special_offer = await special_offer_repository.get_special_offer(condition, session)

        if not special_offer:
            SpecialOfferException.not_found()

        await special_offer_repository.update_special_offer(special_offer, special_offer_update.model_dump(exclude_none=True), session)

        return special_offer_update.model_dump(exclude_none=True)


    async def delete_categories_service(self, id: str, session: AsyncSession):
        condition = and_(Special_Offer.id == id)
        return await special_offer_repository.delete_special_offer(condition, session)



