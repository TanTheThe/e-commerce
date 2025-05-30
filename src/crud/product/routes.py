from fastapi import APIRouter, status, Depends
from src.crud.product.services import ProductService
from src.dependencies import AccessTokenBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database.main import get_session
from fastapi.responses import JSONResponse
from src.schemas.product import ProductCreateModel, ProductUpdateModel
from src.dependencies import admin_role_middleware, customer_role_middleware


product_admin_router = APIRouter(prefix="/product")
product_customer_router = APIRouter(prefix="/product")
product_common_router = APIRouter(prefix="/product")

product_service = ProductService()
access_token_bearer = AccessTokenBearer()


@product_admin_router.post("/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_role_middleware)])
async def create_product(product_data: ProductCreateModel,
                         token_details: dict = Depends(access_token_bearer),
                         session: AsyncSession = Depends(get_session)):
    product_dict = await product_service.create_product(product_data, session)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Sản phẩm mới vừa được thêm vào",
            "content": product_dict
        }
    )


@product_customer_router.get('/{id}')
async def get_detail_product_customer(id: str, session:AsyncSession = Depends(get_session)):
    product_dict = await product_service.get_detail_product_customer_service(id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin chi tiết của sản phẩm",
            "content": product_dict
        }
    )


@product_admin_router.get('/{id}', dependencies=[Depends(admin_role_middleware)])
async def get_detail_product_admin(id: str,
                             token_details: dict = Depends(access_token_bearer),
                             session:AsyncSession = Depends(get_session)):
    product_dict = await product_service.get_detail_product_admin_service(id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin chi tiết của sản phẩm",
            "content": product_dict
        }
    )


@product_customer_router.get('/')
async def get_all_product_customer(skip: int = 0, limit: int = 10,
                                   session:AsyncSession = Depends(get_session)):
    product_list_dict = await product_service.get_all_product(session, skip, limit, include_status=False)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin của các sản phẩm",
            "content": product_list_dict
        }
    )


@product_admin_router.get('/', dependencies=[Depends(admin_role_middleware)])
async def get_all_product_admin(token_details: dict = Depends(access_token_bearer),
                                skip: int = 0, limit: int = 10,
                                session:AsyncSession = Depends(get_session)):
    product_list_dict = await product_service.get_all_product(session, skip, limit, include_status=True)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin của các sản phẩm",
            "content": product_list_dict
        }
    )


@product_admin_router.put('/{id}', dependencies=[Depends(admin_role_middleware)])
async def update_product(id: str, product_data: ProductUpdateModel,
                         token_details: dict = Depends(access_token_bearer),
                         session:AsyncSession = Depends(get_session)):
    product = await product_service.update_product(id, product_data, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin của các sản phẩm sau khi cập nhật",
            "content": product
        }
    )


@product_admin_router.delete('/{id}', dependencies=[Depends(admin_role_middleware)])
async def delete_product(id: str, token_details: dict = Depends(access_token_bearer),
                         session: AsyncSession = Depends(get_session)):
    product = await product_service.delete_product(id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Xóa sản phẩm thành công",
            "content": product
        }
    )














