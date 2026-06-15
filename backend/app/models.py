from dataclasses import dataclass

from pydantic import BaseModel



@dataclass(slots=True)
class SatelliteTLE:
    name: str
    line1: str
    line2: str


class SatellitePosition(BaseModel):
    name: str
    latitude: float
    longitude: float
    altitude_km: float

