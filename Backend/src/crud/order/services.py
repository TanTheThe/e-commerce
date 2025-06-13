from sqlalchemy.orm import selectinload
from src.database.models import Special_Offer, User, Address, Order, Order_Detail, Product_Variant
from src.crud.address.repositories import AddressRepository
from src.crud.order.repositories import OrderRepository
from src.crud.special_offer.repositories import SpecialOfferRepository
from src.crud.user.repositories import UserRepository
from src.crud.product.repositories import ProductRepository
from src.crud.order_detail.repositories import OrderDetailRepository
from src.crud.product_variant.repositories import ProductVariantRepository
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from fastapi import HTTPException, status

from src.errors.address import AddressException
from src.errors.order import OrderException
from src.errors.product import ProductException
from src.schemas.order import OrderCreateModel
import time
import asyncio
from src.errors.authentication import AuthException

order_repository = OrderRepository()
special_offer_repository = SpecialOfferRepository()
user_repository = UserRepository()
address_repository = AddressRepository()
product_repository = ProductRepository()
order_detail_repository = OrderDetailRepository()
product_variant_repository = ProductVariantRepository()


class OrderService:
    async def validate_order_dependencies(self, customer_id, address_id, offer_id, session):
        # Mỗi phần tử là 1 lời gọi đến DB
        tasks = [
            user_repository.get_user(User.id == customer_id, session),
            address_repository.get_address(Address.id == address_id, session),
        ]

        # Nếu có offer_id, thì thêm một tác vụ nữa để truy vấn ưu đãi đó.
        if offer_id:
            tasks.append(special_offer_repository.get_special_offer(Special_Offer.id == offer_id, session))
        # Nếu không có ưu đãi, ta vẫn append() một cái gì đó để giữ thứ tự kết quả, vì gather() trả về theo đúng thứ tự các coroutine trong danh sách.
        else:
            tasks.append(asyncio.sleep(0))  # placeholder giữ thứ tự

        # Chạy tất cả coroutine trong tasks cùng lúc, và trả về kết quả sau khi tất cả xong.
        customer, address, special_offer = await asyncio.gather(*tasks)

        if not customer:
            AuthException.user_not_found()

        if not address:
            AddressException.not_found()

        return customer, address, special_offer


    async def create_order(self, customer_id: str, order_data: OrderCreateModel, session: AsyncSession):
        variant_ids = {item.product_variant_id for item in order_data.order_detail}
        condition = Product_Variant.id.in_(variant_ids)
        variants = await product_variant_repository.get_all_product_variant(
            condition, session,
            joins=[selectinload(Product_Variant.product)]
        )
        variant_map = {}
        order_detail_objs = []
        sub_total = 0
        for item in order_data.order_detail:
            variant = next((v for v in variants if str(v.id) == item.product_variant_id), None)
            if not variant:
                ProductException.not_found_variant()

            product = variant.product
            if not product:
                ProductException.not_found()

            sub_total += item.quantity * variant.price
            product_dict = {
                "name": product.name,
                "images": product.images,
                "price": variant.price,
                "quantity": variant.quantity,
                "size": variant.size,
                "color": variant.color
            }

            order_detail_dict = {
                "quantity": item.quantity,
                "price": variant.price,
                "product_id": str(variant.product_id),
                "product_variant_id": str(variant.id),
                "Product": product_dict
            }

            order_detail_objs.append(Order_Detail(**order_detail_dict))
            variant_map[str(variant.id)] = variant

        customer, address, special_offer = await self.validate_order_dependencies(
            customer_id, order_data.address_id, order_data.special_offer_id, session
        )

        discount = 0
        if special_offer and (special_offer.condition is None or sub_total >= special_offer.condition):
            if special_offer.type == "percent":
                discount = int(sub_total * special_offer.discount / 100)
            elif special_offer.type == "fixed":
                discount = special_offer.discount

        total_price = sub_total - discount

        address_dict = {
            "line": address.line,
            "street": address.street,
            "ward": address.ward,
            "city": address.city,
            "district": address.district,
            "country": address.country
        }

        new_order_dict = {
            "code": str(int(time.time() * 1000)),
            "sub_total": sub_total,
            "total_price": total_price,
            "discount": discount,
            "note": order_data.note,
            "payment_method": "vnpay",
            "transaction_no": "",
            "user_id": customer_id,
            "Address": address_dict
        }

        new_order = await order_repository.create_order(new_order_dict, session)
        for od in order_detail_objs:
            od.order_id = new_order.id

        await order_detail_repository.create_order_detail(order_detail_objs, session)
        await session.commit()

        response = {
            "order_id": str(new_order.id),
            "sub_total": sub_total,
            "total_price": total_price,
            "note": new_order.note,
            "special_offer": {
                "id": str(special_offer.id),
                "code": special_offer.code,
                "name": special_offer.name,
                "discount": special_offer.discount,
                "condition": special_offer.condition,
                "type": special_offer.type,
            } if special_offer else None,
            "address": {
                "id": str(address.id),
                "line": address.line,
                "street": address.street,
                "ward": address.ward,
                "city": address.city,
                "district": address.district,
                "country": address.country,
            },
            "order_detail": [
                {
                    "quantity": od.quantity,
                    "price": str(od.price),
                    "product_id": str(od.product_id),
                    "product_variant_id": str(od.product_variant_id)
                }
                for od in order_detail_objs
            ]
        }

        return response


    async def get_detail_order_admin(self, order_id: str, session: AsyncSession):
        joins = [
            selectinload(Order.order_detail).selectinload(Order_Detail.product),
            selectinload(Order.order_detail).selectinload(Order_Detail.product_variant),
            selectinload(Order.user),
        ]

        condition = and_(Order.id == order_id)
        order = await order_repository.get_order(condition, session, joins)

        if not order:
            OrderException.not_found()

        user = order.user
        user_response = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
        } if user else None

        address = order.Address
        address_response = {
            "line": address["line"],
            "street": address["street"],
            "ward": address["ward"],
            "city": address["city"],
            "district": address["district"],
            "country": address["country"],
        } if address else None

        order_detail_response = []
        for od in order.order_detail:
            product = od.product
            variant = od.product_variant

            if product and variant:
                product_dict = {
                    "name": product.name,
                    "images": product.images,
                    "price": variant.price if variant else None,
                    "quantity": variant.quantity if variant else None,
                    "size": variant.size if variant else None,
                    "color": variant.color if variant else None,
                }
            else:
                product_dict = {}

            order_detail_response.append(product_dict)

        response = {
            "order": {
                "code": order.code,
                "note": order.note,
                "status": order.status,
                "created_at": str(order.created_at),
                "sub_total": order.sub_total,
                "discount": order.discount,
                "total_price": order.total_price,
            },
            "customer": user_response,
            "address": address_response,
            "order_detail": order_detail_response
        }

        return response


    async def get_detail_order_customer(self, order_id: str, customer_id: str, session: AsyncSession):
        joins = [
            selectinload(Order.order_detail).selectinload(Order_Detail.product),
            selectinload(Order.order_detail).selectinload(Order_Detail.product_variant),
            selectinload(Order.user),
        ]

        condition = and_(Order.id == order_id)
        order = await order_repository.get_order(condition, session, joins)

        if not order:
            OrderException.not_found()

        if str(order.user_id) != str(customer_id):
            OrderException.unauthorized_order()

        user = order.user
        user_response = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
        } if user else None

        address = order.Address
        address_response = {
            "line": address["line"],
            "street": address["street"],
            "ward": address["ward"],
            "city": address["city"],
            "district": address["district"],
            "country": address["country"],
        } if address else None

        order_detail_response = []
        for od in order.order_detail:
            product = od.product
            variant = od.product_variant

            if product and variant:
                product_dict = {
                    "name": product.name,
                    "images": product.images,
                    "price": variant.price if variant else None,
                    "quantity": variant.quantity if variant else None,
                    "size": variant.size if variant else None,
                    "color": variant.color if variant else None,
                }
            else:
                product_dict = {}

            order_detail_response.append(product_dict)

        response = {
            "order": {
                "code": order.code,
                "note": order.note,
                "status": order.status,
                "created_at": str(order.created_at),
                "sub_total": order.sub_total,
                "discount": order.discount,
                "total_price": order.total_price,
            },
            "customer": user_response,
            "address": address_response,
            "order_detail": order_detail_response
        }

        return response


    async def get_all_order_admin(self, session: AsyncSession, skip: int = 0, limit: int = 10):
        orders = await order_repository.get_all_order(None, session, skip=skip, limit=limit)

        response = []
        for order in orders:
            order_dict = {
                "code": order.code,
                "status": order.status,
                "created_at": str(order.created_at),
                "total_price": order.total_price,
            }
            response.append(order_dict)

        return response


    async def get_all_order_customer(self, user_id: str, session: AsyncSession, skip: int = 0, limit: int = 10):
        condition = and_(Order.user_id == user_id)
        orders = await order_repository.get_all_order(condition, session, skip=skip, limit=limit)

        response = []
        for order in orders:
            order_dict = {
                "code": order.code,
                "status": order.status,
                "created_at": str(order.created_at),
                "total_price": order.total_price,
            }
            response.append(order_dict)

        return response


    async def update_status(self, order_id, status, session: AsyncSession):
        condition = and_(Order.id == order_id)
        order_to_update = await order_repository.get_order(condition, session)

        if order_to_update is None:
            OrderException.not_found()

        status_dict = status.model_dump()

        order_after_update = await order_repository.update_order(order_to_update, status_dict, session)

        return order_after_update











