from fastapi import APIRouter, Depends, HTTPException, Request
from starlette import status
from src.dependencies import AccessTokenBearer, RefreshTokenBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from src.crud.authentication.utils import create_access_token
from fastapi.responses import JSONResponse
from src.schemas.user import UserLoginModel, UserLoginAdminModel, PasswordResetConfirmModel, PasswordResetEmailModel
from src.database.main import get_session
from datetime import datetime
from src.crud.authentication.services import AuthenticationService
from src.dependencies import admin_role_middleware, customer_role_middleware

auth_admin_router = APIRouter(prefix="/auth")
auth_customer_router = APIRouter(prefix="/auth")
auth_common_router = APIRouter(prefix="/auth")

REFRESH_TOKEN_EXPIRY = 2

auth_service = AuthenticationService()

@auth_customer_router.post("/login")
async def login_customer(user_data: UserLoginModel, session: AsyncSession = Depends(get_session)):
    return await auth_service.login_customer_service(user_data, session)


@auth_admin_router.post("/login")
async def login_admin(user_data: UserLoginAdminModel, session: AsyncSession = Depends(get_session)):
    return await auth_service.login_admin_service(user_data, session)


@auth_admin_router.get("/logout", dependencies=[Depends(admin_role_middleware)])
async def revoke_token(request: Request, token_details: dict = Depends(AccessTokenBearer())):
    await auth_service.revoke_token_service(token_details, request)

    return JSONResponse(
        content={
            "messages": "Đăng xuất thành công"
        },
        status_code=status.HTTP_200_OK
    )

@auth_customer_router.get("/logout", dependencies=[Depends(customer_role_middleware)])
async def revoke_token(request: Request, token_details: dict = Depends(AccessTokenBearer())):
    await auth_service.revoke_token_service(token_details, request)

    return JSONResponse(
        content={
            "messages": "Đăng xuất thành công"
        },
        status_code=status.HTTP_200_OK
    )


@auth_customer_router.post('/forgot-password')
async def forgot_password(email_data: PasswordResetEmailModel, session: AsyncSession = Depends(get_session)):
    message = await auth_service.forgot_password_service(email_data.email, email_data.check, 'customer', session)

    return JSONResponse(
        content={"message": message},
        status_code=status.HTTP_200_OK
    )

@auth_customer_router.post('/confirm-reset/{token}')
async def forget_password_confirm(token: str, data: PasswordResetConfirmModel,
                                  session: AsyncSession = Depends(get_session)):
    message = await auth_service.forgot_password_confirm_service(data, token, 'customer', session)
    return JSONResponse(content={"message": message}, status_code=200)


@auth_customer_router.get("/forgot-password/{token}")
async def verify_reset_token(token: str):
    return JSONResponse(
        content={"message": "Token hợp lệ hoặc đang xử lý, vui lòng chuyển đến trang nhập mật khẩu mới"},
        status_code=status.HTTP_200_OK
    )


@auth_admin_router.post('/forgot-password')
async def forgot_password(email_data: PasswordResetEmailModel, session: AsyncSession = Depends(get_session)):
    message = await auth_service.forgot_password_service(email_data.email, email_data.check, 'admin', session)

    return JSONResponse(
        content={"message": message},
        status_code=status.HTTP_200_OK
    )

@auth_admin_router.post('/confirm-reset/{token}')
async def forget_password_confirm(token: str, data: PasswordResetConfirmModel,
                                  session: AsyncSession = Depends(get_session)):
    message = await auth_service.forgot_password_confirm_service(data, token, 'admin', session)
    return JSONResponse(content={"message": message}, status_code=200)


@auth_admin_router.get("/forgot-password/{token}")
async def verify_reset_token(token: str):
    return JSONResponse(
        content={"message": "Token hợp lệ hoặc đang xử lý, vui lòng chuyển đến trang nhập mật khẩu mới"},
        status_code=status.HTTP_200_OK
    )


@auth_customer_router.get('/refresh-token', dependencies=[Depends(customer_role_middleware)])
async def get_new_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details["exp"]

    if datetime.fromtimestamp(expiry_timestamp) > datetime.now() and token_details['role'] == "customer":
        new_access_token = create_access_token(
            user_data=token_details["user"],
            role="customer"
        )

        return JSONResponse(content={
            "access_token": new_access_token
        })

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={
            "message": "Token không hợp lệ hoặc đã hết hạn",
            "error_code": "auth_014",
        },
    )

@auth_admin_router.get('/refresh-token', dependencies=[Depends(admin_role_middleware)])
async def get_new_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details["exp"]

    if datetime.fromtimestamp(expiry_timestamp) > datetime.now() and token_details['role'] == "admin":
        new_access_token = create_access_token(
            user_data=token_details["user"],
            role = "admin"
        )

        return JSONResponse(content={
            "access_token": new_access_token
        })

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={
            "message": "Token không hợp lệ hoặc đã hết hạn",
            "error_code": "auth_014",
        },
    )
