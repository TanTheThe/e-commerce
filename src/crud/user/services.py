from starlette.responses import JSONResponse
from src.database.models import User
from src.errors.authentication import AuthException
from src.errors.user import UserException
from src.schemas.user import UserCreateModel
from src.crud.authentication.utils import generate_password_hash, create_url_safe_token, decode_url_safe_token
from sqlmodel import and_
from src.mail import create_message, mail
from fastapi import HTTPException, BackgroundTasks
from sqlmodel.ext.asyncio.session import AsyncSession
from src.config import Config
from src.crud.user.repositories import UserRepository
from fastapi import status

user_repository = UserRepository()

class UserService:
    async def get_detail_admin_service(self, id: str, session: AsyncSession):
        condition = and_(User.id == id)
        user = await user_repository.get_user(condition, session=session)

        if not user:
            AuthException.user_not_found()

        filtered_user = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "is_verified": user.is_verified,
            "customer_status": user.customer_status,
            "is_customer": user.is_customer,
            "two_fa_enabled": user.two_fa_enabled
        }

        return filtered_user


    async def get_all_customer_service(self, session: AsyncSession):
        users = await user_repository.get_all_user(None, session)

        filtered_users = [
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "customer_status": user.customer_status
            }
            for user in users
        ]

        return filtered_users


    async def get_profile_customer_service(self, id: str, session: AsyncSession):
        condition = and_(User.id == id)
        user = await user_repository.get_user(condition, session=session)

        if not user:
            AuthException.user_not_found()

        filtered_user = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone
        }

        return filtered_user


    async def update_profile_service(self, user_id: str, update_data, session: AsyncSession):
        condition = and_(User.id == user_id)
        user_need_update = await user_repository.get_user(condition, session)

        if not user_need_update:
            AuthException.user_not_found()

        user_after_update = await user_repository.update_user(user_need_update, update_data.model_dump(), session)
        await session.commit()

        return user_after_update


    async def create_user_account_service(self, user_data: UserCreateModel,
                                          bg_tasks: BackgroundTasks, session: AsyncSession):
        email = user_data.email

        condition = and_(User.email == email)
        user_exists = await user_repository.get_user(condition, session)
        if user_exists:
            UserException.email_exists()

        new_user = await user_repository.create_user(user_data, session)

        token = create_url_safe_token({"email": email}, role="customer")
        link = f"http://{Config.DOMAIN}/api/v1/customer/user/verify/{token}"
        html = f"""
               <h1>Xác thực email</h1>
               <p>Vui lòng nhấp vào đường: <a href="{link}">link</a> để tiến hành xác thực email</p>
               """
        message = create_message(
            recipients=[email],
            subject="Xác thực email của bạn",
            body=html
        )
        bg_tasks.add_task(mail.send_message, message)

        return new_user


    async def verify_user_account_service(self, token: str, session: AsyncSession):
        token_data = decode_url_safe_token(token, role="customer")
        if token_data is None:
            AuthException.token_invalid()

        user_email = token_data.get('email')

        if user_email:
            condition = and_(User.email == user_email)
            user = await user_repository.get_user(condition, session)

            if not user:
                AuthException.user_not_found()

            await user_repository.update_user(user, {'is_verified': True, "is_customer": True}, session)

            return JSONResponse(content={
                "message": "Xác thực tài khoản thành công"
            }, status_code=status.HTTP_200_OK)

        AuthException.authentication_error()


    async def change_password_service(self, id: str, password_data, session: AsyncSession):
        new_password = password_data.new_password
        confirm_password = password_data.confirm_new_password

        if new_password != confirm_password:
            AuthException.password_mismatch()

        condition = and_(User.id == id)
        user = await user_repository.get_user(condition, session)

        if not user:
            AuthException.user_not_found()

        password_hash = generate_password_hash(new_password)
        await user_repository.update_user(user, {'password': password_hash}, session)
        await session.commit()

        return JSONResponse(content={
            "message": "Đổi mật khẩu thành công"
        }, status_code=status.HTTP_200_OK)
