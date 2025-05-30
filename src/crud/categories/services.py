from src.database.models import Categories
from src.schemas.categories import CategoriesCreateModel, CategoriesUpdateModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from src.crud.categories.repositories import CategoriesRepository
from src.errors.categories import CategoriesException

categories_repository = CategoriesRepository()

class CategoriesService:
    async def create_categories_service(self, categories_data: CategoriesCreateModel, session: AsyncSession):
        new_categories = await categories_repository.create_categories(categories_data, session)

        new_categories_dict = {
            "name": new_categories.name,
            "images": new_categories.images
        }

        return new_categories_dict


    async def get_all_categories_service(self, session: AsyncSession):
        categories = await categories_repository.get_all_categories(None, session)

        if len(categories) == 0:
            CategoriesException.empty_list()

        return categories


    async def update_categories_service(self, id: str, categories_update: CategoriesUpdateModel, session: AsyncSession):
        condition = and_(Categories.id == id)
        categories = await categories_repository.get_category(condition, session)

        if not categories:
            CategoriesException.not_found()

        await categories_repository.update_categories(categories, categories_update.model_dump(exclude_none=True), session)
        await session.commit()

        return categories_update.model_dump(exclude_none=True)


    async def delete_categories_service(self, id: str, session: AsyncSession):
        condition = and_(Categories.id == id)
        await categories_repository.delete_categories(condition, session)



