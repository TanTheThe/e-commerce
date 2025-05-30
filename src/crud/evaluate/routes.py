from fastapi import APIRouter, status, Depends
from src.crud.evaluate.services import EvaluateService
from src.dependencies import AccessTokenBearer
from src.schemas.evaluate import EvaluateInputModel
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database.main import get_session
from fastapi.responses import JSONResponse
from src.dependencies import admin_role_middleware, customer_role_middleware

evaluate_admin_router = APIRouter(prefix="/evaluate")
evaluate_customer_router = APIRouter(prefix="/evaluate")
evaluate_common_router = APIRouter(prefix="/evaluate")

evaluate_service = EvaluateService()
access_token_bearer = AccessTokenBearer()


@evaluate_customer_router.post("/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(customer_role_middleware)])
async def create_evaluate(evaluate_data: EvaluateInputModel,
                          token_details: dict = Depends(access_token_bearer),
                          session: AsyncSession = Depends(get_session)):

    customer_id = token_details["user"]["id"]
    new_evaluate_dict = await evaluate_service.create_evaluate_service(customer_id, evaluate_data, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Đánh giá mới vừa được thêm vào",
            "content": new_evaluate_dict
        }
    )


@evaluate_admin_router.get("/{evaluate_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(admin_role_middleware)])
async def get_detail_evaluate_admin(evaluate_id: str,
                                    token_details: dict = Depends(access_token_bearer),
                                    session: AsyncSession = Depends(get_session)):
    order_dict = await evaluate_service.get_detail_evaluate_admin(evaluate_id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Chi tiết của đánh giá",
            "content": order_dict
        }
    )


@evaluate_customer_router.get("/{evaluate_id}", status_code=status.HTTP_200_OK)
async def get_detail_evaluate_customer(evaluate_id: str,
                                       session: AsyncSession = Depends(get_session)):
    order_dict = await evaluate_service.get_detail_evaluate_customer(evaluate_id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Chi tiết của đánh giá",
            "content": order_dict
        }
    )


@evaluate_admin_router.get("/", status_code=status.HTTP_200_OK, dependencies=[Depends(admin_role_middleware)])
async def get_all_evaluate_admin(token_details: dict = Depends(access_token_bearer),
                                 session: AsyncSession = Depends(get_session)):
    evaluate_dict = await evaluate_service.get_all_evaluate_admin(session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin các đánh giá",
            "content": evaluate_dict
        }
    )


@evaluate_customer_router.get("/", status_code=status.HTTP_200_OK)
async def get_all_evaluate_customer(session: AsyncSession = Depends(get_session)):
    evaluate_dict = await evaluate_service.get_all_evaluate_customer(session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin các đánh giá",
            "content": evaluate_dict
        }
    )


@evaluate_admin_router.delete('/{id}', dependencies=[Depends(admin_role_middleware)])
async def delete_product(id: str, token_details: dict = Depends(access_token_bearer),
                         session: AsyncSession = Depends(get_session)):
    product = await evaluate_service.delete_evaluate(id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Xóa đánh giá thành công",
            "content": product
        }
    )




