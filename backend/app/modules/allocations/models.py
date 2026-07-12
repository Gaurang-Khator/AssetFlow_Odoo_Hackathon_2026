import enum
import uuid
from sqlalchemy import Column, ForeignKey, DateTime, Text, Boolean, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.core.database import Base


def gen_uuid():
    return str(uuid.uuid4())


class TransferStatus(str, enum.Enum):
    REQUESTED = "REQUESTED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class Allocation(Base):
    __tablename__ = "allocations"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    asset_id = Column(UUID(as_uuid=False), ForeignKey("assets.id"), nullable=False)
    employee_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    department_id = Column(UUID(as_uuid=False), ForeignKey("departments.id"), nullable=True)
    allocated_at = Column(DateTime, server_default=func.now())
    expected_return_date = Column(DateTime, nullable=True)
    returned_at = Column(DateTime, nullable=True)
    condition_note = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)


class TransferRequest(Base):
    __tablename__ = "transfer_requests"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    asset_id = Column(UUID(as_uuid=False), ForeignKey("assets.id"), nullable=False)
    from_employee_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    to_employee_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False)
    status = Column(Enum(TransferStatus), default=TransferStatus.REQUESTED, nullable=False)
    requested_at = Column(DateTime, server_default=func.now())
    resolved_at = Column(DateTime, nullable=True)