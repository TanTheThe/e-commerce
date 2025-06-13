from sqlalchemy.orm import selectinload
from src.crud.product_variant.repositories import ProductVariantRepository
from src.database.models import Product, Categories_Product, Categories
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from datetime import datetime
from src.crud.product.repositories import ProductRepository
from src.crud.categories.repositories import CategoriesRepository
from src.crud.categories_product.repositories import CategoriesProductRepository
from src.crud.product_variant.services import ProductVariantService
from src.crud.categories_product.services import CategoriesProductService
from src.errors.product import ProductException
from src.errors.categories import CategoriesException

product_repository = ProductRepository()
categories_repository = CategoriesRepository()
cate_product_repository = CategoriesProductRepository()
product_variant_repository = ProductVariantRepository()

product_variant_service = ProductVariantService()
categories_product_service = CategoriesProductService()


class ProductService:
    async def create_product(self, product_data, session: AsyncSession):
        if not product_data.name:
            ProductException.invalid_name()

        if not product_data.images:
            ProductException.invalid_images()

        if not product_data.categories_id:
            ProductException.invalid_categories()

        if not product_data.product_variant:
            ProductException.invalid_variant()

        new_product = await product_repository.create_product(product_data, session)

        category_ids = product_data.categories_id
        condition = Categories.id.in_(category_ids)
        existing_categories = await categories_repository.get_all_categories(condition, session)

        if len(existing_categories) < len(category_ids):
            CategoriesException.categories_not_exist()

        await cate_product_repository.create_cate_product(existing_categories, new_product.id, session)

        await product_variant_repository.create_product_variant(product_data.product_variant, new_product.id, session)

        await session.commit()
        await session.refresh(new_product)

        product_dict = {
            "name": new_product.name,
            "images": new_product.images,
            "description": new_product.description,
            "categories": [{"name": category.name} for category in existing_categories],
            "status": new_product.status,
            "product_variant": [item.dict() for item in product_data.product_variant]
        }

        return product_dict


    async def get_detail_product(self, product_id: str, session: AsyncSession):
        condition = and_(Product.id == product_id)
        joins = [
            selectinload(Product.product_variant),
            selectinload(Product.categories_product).selectinload(Categories_Product.categories)
        ]
        product_obj = await product_repository.get_product(condition, session, joins)

        if not product_obj:
            ProductException.not_found()

        product_dict = product_obj.model_dump()

        product_dict["product_variant"] = [
            variant.model_dump() for variant in product_obj.product_variant
        ]

        product_dict["categories"] = [
            cp.categories.name for cp in product_obj.categories_product if cp.categories
        ]

        return product_dict


    async def get_detail_product_customer_service(self, product_id: str, session: AsyncSession):
        product = await self.get_detail_product(product_id, session)

        if product is None:
            ProductException.not_found()

        product_variant = [
            {
                "id": str(item["id"]),
                "size": item["size"],
                "color": item["color"],
                "price": item["price"],
                "quantity": item["quantity"],
            }
            for item in product["product_variant"]
        ]

        product_dict = {
            "id": str(product["id"]),
            "name": product["name"],
            "images": product["images"],
            "description": product["description"],
            "categories": product["categories"],
            "product_variant": product_variant
        }

        return product_dict


    async def get_detail_product_admin_service(self, product_id: str, session: AsyncSession):
        product = await self.get_detail_product(product_id, session)

        if product is None:
            ProductException.not_found()

        product_variant = [
            {
                "id": str(item["id"]),
                "size": item["size"],
                "color": item["color"],
                "price": item["price"],
                "quantity": item["quantity"],
                "sku": item["sku"]
            }
            for item in product["product_variant"]
        ]

        product_dict = {
            "id": str(product["id"]),
            "name": product["name"],
            "images": product["images"],
            "description": product["description"],
            "categories": product["categories"],
            "status": product["status"],
            "product_variant": product_variant
        }

        return product_dict


    async def get_all_product(self, session: AsyncSession, skip: int = 0, limit: int = 10, include_status: bool = True):
        joins = [selectinload(Product.categories)]
        products = await product_repository.get_all_product(None, session, joins, skip, limit)

        if not products:
            ProductException.empty_list()

        product_list = []
        for product in products:
            product_data = {
                "id": str(product.id),
                "name": product.name,
                "images": product.images,
                "categories_names": [category.name for category in product.categories],
            }
            if include_status:
                product_data["status"] = product.status

            product_list.append(product_data)

        return product_list


    async def update_product(self, product_id: str, product_data, session: AsyncSession):
        condition = and_(Product.id == product_id)
        product_to_update = await product_repository.get_product(condition, session)

        if product_to_update is None:
            ProductException.not_found()

        product_data_dict = product_data.model_dump(exclude_none=True)

        new_variants = product_data_dict.pop("product_variant", None)
        new_category_ids = product_data_dict.pop("categories_id", None)

        if not product_data_dict and new_variants is None and new_category_ids is None:
            ProductException.not_enough_infor_to_update()

        if new_variants is not None:
            await product_variant_service.update_product_variant(product_id, new_variants, session)

        if new_category_ids is not None:
            await categories_product_service.update_categories_product(product_id, new_category_ids, session)

        for k, v in product_data_dict.items():
            setattr(product_to_update, k, v)

        product_to_update.updated_at = datetime.now()
        await session.flush()
        await session.commit()

        return await self.updated_product_response(product_id, session)


    async def updated_product_response(self, product_id: str, session: AsyncSession):
        response = await self.get_detail_product(product_id, session)

        product_variant = [
            {
                "id": str(item["id"]),
                "size": item["size"],
                "color": item["color"],
                "price": item["price"],
                "quantity": item["quantity"],
            }
            for item in response["product_variant"]
        ]

        product_dict = {
            "id": str(response["id"]),
            "name": response["name"],
            "images": response["images"],
            "description": response["description"],
            "categories": response["categories"],
            "product_variant": product_variant
        }

        return product_dict


    async def delete_product(self, product_id: str, session: AsyncSession):
        condition = and_(Product.id == product_id)
        product_delete = await product_repository.delete_product(condition, session)
        return product_delete









