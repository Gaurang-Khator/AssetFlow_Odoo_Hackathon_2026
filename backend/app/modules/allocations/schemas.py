from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AllocationCreate(BaseModel):
    asset_id: str
    employee_id: Optional[str] = None
    department_id: Optional[str] = None
    expected_return_date: Optional[datetime] = None


class AllocationReturn(BaseModel):
    condition_note: str


class AllocationOut(BaseModel):
    id: str
    asset_id: str
    employee_id: Optional[str] = None
    department_id: Optional[str] = None
    allocated_at: datetime
    expected_return_date: Optional[datetime] = None
    returned_at: Optional[datetime] = None
    is_active: bool

    class Config:
        from_attributes = True


class HolderInfo(BaseModel):
    id: str
    name: str


class AllocationConflict(BaseModel):
    error: str = "held_by"
    holder: Optional[HolderInfo] = None
    allow_transfer_request: bool = True
