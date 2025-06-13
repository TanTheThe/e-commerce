from passlib.context import CryptContext
from datetime import timedelta, datetime
import jwt
from src.config import Config
import uuid
import logging
from itsdangerous import URLSafeTimedSerializer
from jwt import ExpiredSignatureError, InvalidTokenError


passwd_context = CryptContext(
    schemes=['bcrypt']
)

ROLE_SECRET_MAP = {
    "admin": Config.JWT_SECRET_ADMIN,
    "customer": Config.JWT_SECRET_CUSTOMER,
}

ACCESS_TOKEN_EXPIRY = 3000

# Hàm băm mật khẩu
def generate_password_hash(password: str) -> str:
    hash = passwd_context.hash(password)
    return hash

# Hàm kiểm tra xem mật khẩu nhập vào có khớp với mã băm hay không.
def verify_password(password: str, hash: str) -> bool:
    return passwd_context.verify(password, hash)

def create_access_token(user_data: dict, role:str, expiry: timedelta = None, refresh: bool = False):
    if role not in ROLE_SECRET_MAP:
        raise ValueError("Không tồn tại role trên")

    payload = {}

    payload['user'] = user_data
    payload['exp'] = datetime.now() + (expiry if expiry is not None else timedelta(seconds=ACCESS_TOKEN_EXPIRY))
    payload['jti'] = str(uuid.uuid4())
    payload['role'] = role
    payload['refresh'] = refresh

    secret_key = ROLE_SECRET_MAP[role]

    token = jwt.encode(
        payload=payload,
        key=secret_key,
        algorithm=Config.JWT_ALGORITHM
    )

    return token

def decode_token(token: str):
    for role, secret_key in ROLE_SECRET_MAP.items():
        try:
            token_data = jwt.decode(
                jwt=token,
                key=secret_key,
                algorithms=[Config.JWT_ALGORITHM]
            )
            if token_data.get("role") == role:
                return token_data

        except InvalidTokenError:
            continue

    logging.warning("Không giải mã được mã thông báo với tất cả các secret đã biết")
    return None


def get_serializer_for_role(role: str) -> URLSafeTimedSerializer:
    if role == "admin":
        salt = "admin-email-configuration"
        return URLSafeTimedSerializer(secret_key=Config.JWT_SECRET_ADMIN, salt=salt)
    elif role == "customer":
        salt = "customer-email-configuration"
        return URLSafeTimedSerializer(secret_key=Config.JWT_SECRET_CUSTOMER, salt=salt)
    else:
        raise ValueError("Invalid role")


def create_url_safe_token(data: dict, role: str) -> str:
    serializer = get_serializer_for_role(role)
    return serializer.dumps(data)

def decode_url_safe_token(token: str, role: str) -> dict:
    try:
        serializer = get_serializer_for_role(role)
        return serializer.loads(token)
    except Exception as e:
        logging.error(f"Token decode error for role={role}: {str(e)}")
        return None

