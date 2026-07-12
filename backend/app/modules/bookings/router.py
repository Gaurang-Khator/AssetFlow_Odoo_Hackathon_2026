from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

# NOTE: bookings business logic/services are not present in this repo yet.
# This router is intentionally minimal to expose endpoints in /docs without changing logic.

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("", summary="List bookings (not implemented)")
async def list_bookings(db: AsyncSession = Depends(get_db)):
    return []

