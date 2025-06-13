from typing import Optional
from pydantic import BaseModel, Field, model_validator
import uuid
from datetime import datetime

class UserModel(BaseModel):
    id: uuid.UUID
    first_name: str
    last_name: str
    email: str
    password: str = Field(exclude=True)
    phone: Optional[str]
    customer_status: str = Field(default="active")
    created_at: datetime = Field(default=datetime.now)
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
    is_verified: bool = Field(default=False)
    is_admin: bool = Field(default=False)
    is_customer: bool = Field(default=False)
    two_fa_secret: Optional[str]
    two_fa_enabled: bool = Field(default=False)

class UserCreateModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class CustomerUpdateModel(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None


class UserReadModel(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str

class AdminUpdateModel(BaseModel):
    customer_status: Optional[str] = Field(default="active")

class UserLoginModel(BaseModel):
    email: str
    password: str

class UserLoginAdminModel(UserLoginModel):
    email: str
    password: str
    otp: Optional[str]

class PasswordResetEmailModel(BaseModel):
    email: str
    check: str

class PasswordResetConfirmModel(BaseModel):
    new_password: str
    confirm_new_password: str
    email: Optional[str] = None
    otp: Optional[str] = None
    check: str

    @model_validator(mode='after')
    def validate_fields_based_on_check(self):
        if self.check.lower() == 'otp':
            if not self.email:
                raise ValueError("Trường 'email' là bắt buộc khi sử dụng OTP")
            if not self.otp:
                raise ValueError("Trường 'otp' là bắt buộc khi sử dụng OTP")

        return self

class ChangePasswordModel(BaseModel):
    new_password: str
    confirm_new_password: str


