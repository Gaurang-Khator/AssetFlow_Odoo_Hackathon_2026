from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.modules.allocations import repository as allocation_repo

from app.modules.assets import repository as asset_repo
from app.modules.users import repository as user_repo



def allocate_asset(
    db: Session,
    asset_id: str,
    employee_id: Optional[str],
    department_id: Optional[str],
    expected_return_date,
):
    # --- Conflict rule: block if asset already has an active allocation ---
    existing = allocation_repo.get_active_allocation_for_asset(db, asset_id)
    if existing:
        holder = None
        if existing.employee_id:
            holder_user = user_repo.get_by_id(db, existing.employee_id)
            if holder_user:
                holder = {"id": holder_user.id, "name": holder_user.name}
        raise HTTPException(
            status_code=409,
            detail={
                "error": "held_by",
                "holder": holder,
                "allow_transfer_request": True,
            },
        )

    allocation = allocation_repo.create_allocation(
        db, asset_id, employee_id, department_id, expected_return_date
    )
    # allocations module uses sync Session; keep call sites consistent.
    # asset_repo.update_status is async in this codebase, so run it in a safe way.
    # Minimal wiring: call via asyncio if needed.
    import asyncio

    asyncio.run(asset_repo.update_status(db, asset_id, "ALLOCATED"))
    return allocation



def return_asset(db: Session, asset_id: str, condition_note: str):
    allocation = allocation_repo.get_active_allocation_for_asset(db, asset_id)
    if not allocation:
        raise HTTPException(status_code=404, detail="No active allocation found for this asset")

    allocation_repo.close_allocation(db, allocation, condition_note)
    import asyncio

    asyncio.run(asset_repo.update_status(db, asset_id, "AVAILABLE"))
    return allocation



def list_overdue(db: Session):
    return allocation_repo.get_overdue_allocations(db)
