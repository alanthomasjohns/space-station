from skyfield.api import EarthSatellite, load
from app.models import SatelliteTLE, SatellitePosition


class PositionCalculator:

    def __init__(self):
        self.timescale = load.timescale()

    def calculate(self, satellite: SatelliteTLE):
        skyfield_satellite = EarthSatellite(
            satellite.line1,
            satellite.line2,
            satellite.name,
        )
        current_time = self.timescale.now()
        position = skyfield_satellite.at(current_time)
        subpoint = position.subpoint() #(x, y axis or lat/long coords)
        latitude = subpoint.latitude.degrees
        longitude = subpoint.longitude.degrees
        altitude = subpoint.elevation.km
    
        return SatellitePosition(
            name=satellite.name,
            latitude=latitude,
            longitude=longitude,
            altitude_km=altitude
        )