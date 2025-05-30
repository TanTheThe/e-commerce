from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from src.crud.categories_product.repositories import CategoriesProductRepository
from src.database.models import Categories_Product
from src.schemas.categories_product import CategoriesCreateModel

categories_product_repository = CategoriesProductRepository()

class CategoriesProductService:
    async def update_categories_product(self, product_id: str, new_category_ids: list, session: AsyncSession):
        condition = and_(Categories_Product.product_id == product_id)
        await categories_product_repository.delete_cate_product(condition, session)

        create_data = [
            CategoriesCreateModel(product_id=str(product_id), categories_id=str(category_id))
            for category_id in new_category_ids
        ]

        await categories_product_repository.create_cate_product(create_data, product_id, session)








