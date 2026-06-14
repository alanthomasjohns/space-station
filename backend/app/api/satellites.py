from fastapi import APIRouter
from dataclasses import asdict
from app.services.satellite_service import SatelliteService

router = APIRouter(
    prefix="/satellites",
    tags=["Satellites"],
)
service = SatelliteService()


@router.get("/")
async def get_satellite_tle():
    """
    Fetch the latest TLE data for space stations
    from CelesTrak.
    """

    satellites = await service.get_satellites()
    return [asdict(satellite) for satellite in satellites]