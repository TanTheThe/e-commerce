from fastapi import APIRouter, status, Depends
from src.crud.order.services import OrderService
from src.dependencies import AccessTokenBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database.main import get_session
from fastapi.responses import JSONResponse
from src.schemas.order import OrderCreateModel, StatusUpdateModel
from src.dependencies import admin_role_middleware, customer_role_middleware

order_admin_router = APIRouter(prefix="/order")
order_customer_router = APIRouter(prefix="/order")
order_common_router = APIRouter(prefix="/order")

order_service = OrderService()
access_token_bearer = AccessTokenBearer()


@order_customer_router.post("/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(customer_role_middleware)])
async def create_order(order_data: OrderCreateModel,
                       token_details: dict = Depends(access_token_bearer),
                       session: AsyncSession = Depends(get_session)):
    customer_id = token_details['user']['id']
    order_dict = await order_service.create_order(customer_id, order_data, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Sản phẩm mới vừa được thêm vào",
            "content": order_dict,
        }
    )


@order_customer_router.get("/{order_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(customer_role_middleware)])
async def get_detail_order_customer(order_id: str,
                                    token_details: dict = Depends(access_token_bearer),
                                    session: AsyncSession = Depends(get_session)):
    customer_id = token_details['user']['id']
    order_dict = await order_service.get_detail_order_customer(order_id, customer_id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Chi tiết của đơn hàng",
            "content": order_dict
        }
    )


@order_admin_router.get("/{order_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(admin_role_middleware)])
async def get_detail_order_admin(order_id: str,
                                 token_details: dict = Depends(access_token_bearer),
                                 session: AsyncSession = Depends(get_session)):
    order_dict = await order_service.get_detail_order_admin(order_id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Chi tiết của đơn hàng",
            "content": order_dict
        }
    )


@order_customer_router.get("/", status_code=status.HTTP_200_OK, dependencies=[Depends(customer_role_middleware)])
async def get_all_order_customer(skip: int = 0, limit: int = 10,
                                 token_details: dict = Depends(access_token_bearer),
                                 session: AsyncSession = Depends(get_session)):
    customer_id = token_details['user']['id']
    order_dict = await order_service.get_all_order_customer(customer_id, session, skip=skip, limit=limit)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin các đơn hàng",
            "content": order_dict
        }
    )


@order_admin_router.get("/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_role_middleware)])
async def get_all_order_admin(skip: int = 0, limit: int = 10,
                              token_details: dict = Depends(access_token_bearer),
                              session: AsyncSession = Depends(get_session)):
    order_dict = await order_service.get_all_order_admin(session, skip=skip, limit=limit)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin các đơn hàng",
            "content": order_dict
        }
    )


@order_admin_router.put("/status/{order_id}", status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_role_middleware)])
async def update_status(order_id: str,
                        status_update: StatusUpdateModel,
                        token_details: dict = Depends(access_token_bearer),
                        session: AsyncSession = Depends(get_session)):
    order_after_update = await order_service.update_status(order_id, status_update, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Trạng thái sau khi cập nhật",
            "content": order_after_update.status
        }
    )





















