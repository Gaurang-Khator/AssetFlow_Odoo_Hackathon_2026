from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.enums.user_role import UserRole
from app.enums.user_status import UserStatus


class UserRegister(BaseModel):
    name: str = Field(..., min_length=3, max_length=150)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole
    status: UserStatus
    department_id: int | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"