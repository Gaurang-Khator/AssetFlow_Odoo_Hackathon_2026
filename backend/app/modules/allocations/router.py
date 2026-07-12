from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.modules.allocations import schemas, service

router = APIRouter(prefix="/allocations", tags=["allocations"])


@router.post("", response_model=schemas.AllocationOut, status_code=201)
def create_allocation(
    payload: schemas.AllocationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.allocate_asset(
        db,
        payload.asset_id,
        payload.employee_id,
        payload.department_id,
        payload.expected_return_date,
    )


@router.post("/{asset_id}/return", response_model=schemas.AllocationOut)
def return_allocation(
    asset_id: str,
    payload: schemas.AllocationReturn,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.return_asset(db, asset_id, payload.condition_note)


@router.get("", response_model=list[schemas.AllocationOut])
def list_allocations(
    overdue: bool = False,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if overdue:
        return service.list_overdue(db)
    return []
