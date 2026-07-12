from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.modules.allocations.models import Allocation


def get_active_allocation_for_asset(db: Session, asset_id: str) -> Optional[Allocation]:
    return (
        db.query(Allocation)
        .filter(Allocation.asset_id == asset_id, Allocation.is_active.is_(True))
        .first()
    )


def create_allocation(
    db: Session,
    asset_id: str,
    employee_id: Optional[str],
    department_id: Optional[str],
    expected_return_date,
) -> Allocation:
    allocation = Allocation(
        asset_id=asset_id,
        employee_id=employee_id,
        department_id=department_id,
        expected_return_date=expected_return_date,
    )
    db.add(allocation)
    db.commit()
    db.refresh(allocation)
    return allocation


def close_allocation(db: Session, allocation: Allocation, condition_note: str) -> Allocation:
    allocation.returned_at = datetime.utcnow()
    allocation.condition_note = condition_note
    allocation.is_active = False
    db.commit()
    db.refresh(allocation)
    return allocation


def get_overdue_allocations(db: Session):
    now = datetime.utcnow()
    return (
        db.query(Allocation)
        .filter(
            Allocation.is_active.is_(True),
            Allocation.expected_return_date.isnot(None),
            Allocation.expected_return_date < now,
        )
        .all()
    )
