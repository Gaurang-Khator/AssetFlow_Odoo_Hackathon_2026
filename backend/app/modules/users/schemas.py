# from datetime import datetime

# from pydantic import BaseModel, EmailStr, Field

# from app.enums.user_role import UserRole
# from app.enums.user_status import UserStatus


# class UserRegister(BaseModel):
#     name: str = Field(..., min_length=3, max_length=150)
#     email: EmailStr
#     password: str = Field(..., min_length=8)


# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str


# class UserResponse(BaseModel):
#     id: int
#     name: str
#     email: EmailStr
#     role: UserRole
#     status: UserStatus
#     department_id: int | None
#     created_at: datetime

#     model_config = {
#         "from_attributes": True
#     }


# class TokenResponse(BaseModel):
#     access_token: str
#     token_type: str = "bearer"


from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.enums.user_role import UserRole
from app.enums.user_status import UserStatus


class UserBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=150)
    email: EmailStr




class UserRegister(UserBase):
    password: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="Password must be at least 8 characters long."
    )




class UserLogin(BaseModel):
    email: EmailStr
    password: str




class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=3, max_length=150)
    email: EmailStr | None = None
    department_id: int | None = None
    status: UserStatus | None = None

    model_config = ConfigDict(extra="forbid")



class UserResponse(UserBase):
    id: int
    role: UserRole
    department_id: int | None
    status: UserStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)




class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"



class TokenPayload(BaseModel):
    sub: str
    role: UserRole
    exp: int




class ChangePassword(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=100)




class ForgotPassword(BaseModel):
    email: EmailStr




class ResetPassword(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8, max_length=100)