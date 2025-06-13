from sqlalchemy.orm import selectinload
from src.crud.order_detail.repositories import OrderDetailRepository
from src.crud.evaluate.repositories import EvaluateRepository
from src.database.models import Evaluate, Order_Detail
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import and_
from src.schemas.evaluate import EvaluateCreateModel, EvaluateInputModel
from src.errors.evaluate import EvaluateException

evaluate_repository = EvaluateRepository()
order_detail_repository = OrderDetailRepository()

class EvaluateService:
    async def create_evaluate_service(self, customer_id, evaluate_data: EvaluateInputModel, session: AsyncSession):
        condition = and_(Order_Detail.id == evaluate_data.order_detail_id)
        joins = [selectinload(Order_Detail.order)]
        order_detail = await order_detail_repository.get_order_detail(condition, session, joins)

        if not order_detail:
            EvaluateException.order_detail_not_found()

        if str(customer_id) != str(order_detail.order.user_id):
            EvaluateException.user_not_allowed_to_review()

        evaluate_create_data = EvaluateCreateModel(
            **evaluate_data.model_dump(),
            user_id=str(customer_id),
            product_id=str(order_detail.product_id),
            product_variant_id=str(order_detail.product_variant_id)
        )

        new_evaluate = await evaluate_repository.create_evaluate(evaluate_create_data, session)

        new_evaluate_dict = {
            "comment": new_evaluate.comment,
            "rate": new_evaluate.rate,
            "image": new_evaluate.image
        }

        await session.commit()

        return new_evaluate_dict


    async def get_detail_evaluate_admin(self, evaluate_id: str, session: AsyncSession):
        condition = and_(Evaluate.id == evaluate_id)
        joins = [
            selectinload(Evaluate.order_detail).selectinload(Order_Detail.order), selectinload(Evaluate.user),
            selectinload(Evaluate.product), selectinload(Evaluate.product_variant)
        ]
        evaluate = await evaluate_repository.get_evaluate(condition, session, joins)

        if not evaluate:
            EvaluateException.review_not_found()

        user_evaluate = evaluate.user
        user_response = {
            "first_name": user_evaluate.first_name,
            "last_name": user_evaluate.last_name,
        } if user_evaluate else None

        product_evaluate = evaluate.product
        product_evaluate_variant = evaluate.product_variant
        product_response = {
            "name": product_evaluate.name,
            "size": product_evaluate_variant.size,
            "color": product_evaluate_variant.color
        } if product_evaluate and product_evaluate_variant else None

        order_evaluate = evaluate.order_detail.order
        order_response = {
            "code": order_evaluate.code
        } if order_evaluate else None

        response = {
            "comment": evaluate.comment,
            "rate": evaluate.rate,
            "image": evaluate.image,
            "customer": user_response,
            "product": product_response,
            "order": order_response,
        }

        return response


    async def get_detail_evaluate_customer(self, evaluate_id: str, session: AsyncSession):
        condition = and_(Evaluate.id == evaluate_id)
        joins = [selectinload(Evaluate.user), selectinload(Evaluate.product), selectinload(Evaluate.product_variant)]
        evaluate = await evaluate_repository.get_evaluate(condition, session, joins)

        if not evaluate:
            EvaluateException.review_not_found()

        user_evaluate = evaluate.user
        user_response = {
            "first_name": user_evaluate.first_name,
            "last_name": user_evaluate.last_name,
        } if user_evaluate else None

        product_evaluate = evaluate.product
        product_evaluate_variant = evaluate.product_variant
        product_response = {
            "name": product_evaluate.name,
            "size": product_evaluate_variant.size,
            "color": product_evaluate_variant.color
        } if product_evaluate and product_evaluate_variant else None

        response = {
            "comment": evaluate.comment,
            "rate": evaluate.rate,
            "image": evaluate.image,
            "customer": user_response,
            "product": product_response,
        }

        return response


    async def get_all_evaluate_admin(self, session: AsyncSession):
        joins = [selectinload(Evaluate.product), selectinload(Evaluate.order_detail).selectinload(Order_Detail.order)]
        evaluates = await evaluate_repository.get_all_evaluate(None, session, joins)

        response = []
        for evaluate in evaluates:
            evaluate_dict = {
                "rate": evaluate.rate,
                "product": evaluate.product.name,
                "code": evaluate.order_detail.order.code
            }
            response.append(evaluate_dict)

        return response


    async def get_all_evaluate_customer(self, session: AsyncSession):
        joins = [selectinload(Evaluate.product)]
        evaluates = await evaluate_repository.get_all_evaluate(None, session, joins)

        response = []
        for evaluate in evaluates:
            evaluate_dict = {
                "rate": evaluate.rate,
                "product": evaluate.product.name
            }
            response.append(evaluate_dict)

        return response


    async def delete_evaluate(self, evaluate_id: str, session: AsyncSession):
        condition = and_(Evaluate.id == evaluate_id)
        await evaluate_repository.delete_evaluate(condition, session)