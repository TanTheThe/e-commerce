from datetime import timedelta, datetime
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette.responses import JSONResponse
import random
from src.config import Config
from src.crud.user.services import user_repository
from src.database.models import User
from sqlmodel import and_
from src.crud.authentication.utils import verify_password, create_access_token, create_url_safe_token, \
    decode_url_safe_token, generate_password_hash
import pyotp
import qrcode
from io import BytesIO
import base64
from src.database.redis import add_jti_to_blocklist
from src.mail import create_message, mail
from src.schemas.user import UserLoginAdminModel, UserLoginModel
from src.errors.authentication import AuthException

REFRESH_TOKEN_EXPIRY = 2

class AuthenticationService:
    async def login_admin_service(self, user_data: UserLoginAdminModel, session: AsyncSession):
        email = user_data.email
        password = user_data.password

        condition = and_(User.email == email)
        user = await user_repository.get_user(condition, session)
        if not user:
            AuthException.invalid_account()

        password_valid = verify_password(password, user.password)

        if password_valid:
            if user.is_verified:
                if user.is_admin:

                    # Nếu chưa bật 2FA
                    if not user.two_fa_secret or not user.two_fa_enabled:
                        # Tạo secret key
                        secret = pyotp.random_base32()
                        user.two_fa_secret = secret
                        user.two_fa_enabled = True
                        await session.commit()

                        # Tạo QR Code
                        issuer = "E-Commerce"
                        otp_url = pyotp.totp.TOTP(secret).provisioning_uri(name=user.email, issuer_name=issuer)
                        qr = qrcode.make(otp_url)

                        # Chuyển QR Code thành Base64
                        buffered = BytesIO()
                        qr.save(buffered, format="PNG")
                        qr.save("user_qr.png")
                        qr_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

                        return JSONResponse(
                            content={
                                "message": "Lần đăng nhập đầu tiên - vui lòng quét QR với Google Authenticator",
                                "qr_code_base64": qr_base64,
                            }
                        )

                    # Nếu đã bật 2FA, nhưng chưa nhập OTP mà login
                    if not user_data.otp:
                        AuthException.otp_required()

                    # Kiểm tra otp
                    totp = pyotp.TOTP(user.two_fa_secret)

                    if not totp.verify(user_data.otp):
                        AuthException.invalid_otp()

                    access_token = create_access_token(
                        user_data={
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "id": str(user.id)
                        },
                        role="admin"
                    )

                    refresh_token = create_access_token(
                        user_data={
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "id": str(user.id)
                        },
                        refresh=True,
                        expiry=timedelta(days=REFRESH_TOKEN_EXPIRY),
                        role="admin"
                    )

                    return JSONResponse(
                        content={
                            "messages": "Đăng nhập thành công",
                            "access_token": access_token,
                            "refresh_token": refresh_token,
                            "user": {
                                "email": user.email,
                                "id": str(user.id)
                            }
                        }
                    )

                AuthException.unauthorized()

            AuthException.user_not_verified()

        AuthException.invalid_account()


    async def login_customer_service(self, user_data: UserLoginModel, session: AsyncSession):
        email = user_data.email
        password = user_data.password

        condition = and_(User.email == email)
        user = await user_repository.get_user(condition, session)
        if not user:
            AuthException.invalid_account()

        password_valid = verify_password(password, user.password)

        if password_valid:
            if user.is_verified:
                if user.is_customer:
                    access_token = create_access_token(
                        user_data={
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "id": str(user.id)
                        },
                        role="customer"
                    )

                    refresh_token = create_access_token(
                        user_data={
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "id": str(user.id)
                        },
                        refresh=True,
                        expiry=timedelta(days=REFRESH_TOKEN_EXPIRY),
                        role="customer"
                    )

                    return JSONResponse(
                        content={
                            "messages": "Đăng nhập thành công",
                            "access_token": access_token,
                            "refresh_token": refresh_token,
                            "user": {
                                "email": user.email,
                                "id": str(user.id)
                            }
                        }
                    )
                AuthException.unauthorized()

            AuthException.user_not_verified()

        AuthException.invalid_account()


    async def revoke_token_service(self, token_details, request):
        jti = token_details['jti']
        await add_jti_to_blocklist(jti, request)


    async def forgot_password_service(self, email: str, check: str, role: str, session: AsyncSession):
        check = check.lower()

        if check == "email":
            token = create_url_safe_token({"email": email}, role)
            link = f"http://{Config.DOMAIN}/api/v1/{role}/auth/forgot-password/{token}"
            html_message = f"""
                <h1>Đổi mật khẩu của bạn</h1>
                <p>Hãy nhấp vào đường link này: <a href="{link}">link</a> để thay đổi mật khẩu của bạn</p>
            """
            response_message = "Vui lòng kiểm tra email của bạn để biết hướng dẫn đặt lại mật khẩu"

        elif check == "otp":
            otp = str(random.randint(100000, 999999))
            expires_at = datetime.utcnow() + timedelta(minutes=5)

            condition = and_(User.email == email)
            user = await user_repository.get_user(condition, session)

            if not user:
                AuthException.user_not_found()

            user.otp = otp
            user.expires_at = expires_at
            await session.commit()

            html_message = f"""
                <h1>Mã OTP của bạn</h1>
                <p>OTP: <strong>{otp}</strong></p>
                <p>Mã có hiệu lực trong 5 phút.</p>
            """
            response_message = "Vui lòng kiểm tra email để lấy OTP"

        else:
            AuthException.invalid_check_option()
            return

        message = create_message(recipients=[email], subject="Reset your password", body=html_message)
        await mail.send_message(message)

        return response_message


    async def forgot_password_confirm_service(self, data, token: str, role: str,
                                            session: AsyncSession):
        token_data = decode_url_safe_token(token, role)

        user_email = token_data.get("email")
        if not user_email:
            AuthException.token_invalid()

        condition = and_(User.email == user_email)
        user = await user_repository.get_user(condition, session)
        if not user:
            AuthException.user_not_found()

        password_hash = generate_password_hash(data.new_password)
        await user_repository.update_user(user, {'password': password_hash}, session)
        await session.commit()

        return "Đổi mật khẩu thành công"


    async def verify_otp(self, data, role, session: AsyncSession):
        condition = and_(User.email == data.email)
        user = await user_repository.get_user(condition, session)
        if not user:
            AuthException.user_not_found()

        if user.otp != data.otp:
            AuthException.invalid_otp()

        if not user.expires_at or datetime.utcnow() > user.expires_at:
            AuthException.otp_expired()

        user.otp = None
        user.expires_at = None

        token = create_url_safe_token({"email": data.email}, role)

        return token
