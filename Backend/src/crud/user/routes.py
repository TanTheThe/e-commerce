from fastapi import APIRouter, status, Depends, BackgroundTasks
from src.dependencies import AccessTokenBearer
from src.schemas.user import UserCreateModel, CustomerUpdateModel, AdminUpdateModel, ChangePasswordModel
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database.main import get_session
from src.crud.user.services import UserService
from fastapi.responses import JSONResponse
from src.dependencies import admin_role_middleware, customer_role_middleware
from fastapi.responses import RedirectResponse


user_service = UserService()
access_token_bearer = AccessTokenBearer()

user_admin_router = APIRouter(prefix="/user")
user_customer_router = APIRouter(prefix="/user")
user_common_router = APIRouter(prefix="/user")

@user_customer_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user_account(user_data: UserCreateModel, bg_tasks: BackgroundTasks,
                              session: AsyncSession = Depends(get_session)):
    new_user = await user_service.create_user_account_service(user_data, bg_tasks, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Tạo tài khoản thành công! Vui lòng kiểm tra email để tiến hành xác thực",
            "content": new_user.model_dump()
        }
    )


@user_customer_router.get('/verify/{token}')
async def verify_user_account(token: str, session:AsyncSession = Depends(get_session)):
    try:
        await user_service.verify_user_account_service(token, session)
        return RedirectResponse(url="http://localhost:5173/login?verified=true", status_code=302)
    except Exception:
        return RedirectResponse(url="http://localhost:5173/login?verified=false", status_code=302)


@user_customer_router.put('/', dependencies=[Depends(customer_role_middleware)])
async def update_profile_customer(user_update_data: CustomerUpdateModel,
                                  session:AsyncSession = Depends(get_session),
                                  token_details: dict = Depends(access_token_bearer)):
    id = token_details['user']['id']
    updated_user = await user_service.update_profile_service(id, user_update_data, session)

    return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "messages": "Cập nhật thông tin người dùng thành công",
                    "content": {
                        "first_name": updated_user.first_name,
                        "last_name": updated_user.last_name,
                        "phone": updated_user.phone
                    }
                }
            )


@user_customer_router.get('/', dependencies=[Depends(customer_role_middleware)])
async def get_profile_customer(token_details: dict = Depends(access_token_bearer),
                               session: AsyncSession = Depends(get_session)):
    user_id = token_details['user']['id']
    filtered_user = await user_service.get_profile_customer_service(user_id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin người dùng",
            "content": filtered_user
        }
    )


@user_admin_router.put('/{id}', dependencies=[Depends(admin_role_middleware)])
async def update_status_by_admin(id: str, user_update_data: AdminUpdateModel,
                               token_details: dict = Depends(access_token_bearer),
                               session:AsyncSession = Depends(get_session)):
    updated_user = await user_service.update_profile_service(id, user_update_data, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Cập nhật trạng thái khách hạng thành công",
            "content": {
                "customer_status": updated_user.customer_status
            }
        }
    )



@user_admin_router.get('/{id}', dependencies=[Depends(admin_role_middleware)])
async def get_detail_by_admin(id: str, token_details: dict = Depends(access_token_bearer),
                              session: AsyncSession = Depends(get_session)):
    filtered_user = await user_service.get_detail_admin_service(id, session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin người dùng",
            "content": filtered_user
        }
    )


@user_admin_router.get('/', dependencies=[Depends(admin_role_middleware)])
async def get_all_customer(token_details: dict = Depends(access_token_bearer),
                           session: AsyncSession = Depends(get_session)):
    filtered_users = await user_service.get_all_customer_service(session)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "messages": "Thông tin người dùng",
            "content": filtered_users
        }
    )


@user_customer_router.put('/change-password', dependencies=[Depends(customer_role_middleware)])
async def change_password_customer(passwords: ChangePasswordModel, session: AsyncSession = Depends(get_session),
                                   token_details: dict = Depends(access_token_bearer)):
    user_id = token_details['user']['id']
    return await user_service.change_password_service(user_id, passwords, session)


@user_admin_router.put('/change-password', dependencies=[Depends(admin_role_middleware)])
async def change_password_admin(passwords: ChangePasswordModel, session: AsyncSession = Depends(get_session),
                                token_details: dict = Depends(access_token_bearer)):
    user_id = token_details['user']['id']
    return await user_service.change_password_service(user_id, passwords, session)




