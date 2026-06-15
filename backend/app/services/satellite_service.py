from app.parser import TLEParser
from app.providers.tle_provider import TLEProvider
from app.tracking.position_calculator import PositionCalculator


class SatelliteService:

    def __init__(self):
        self.provider = TLEProvider()
        self.parser = TLEParser()
        self.position_calculator = PositionCalculator()

    async def get_satellites(self):

        raw = await self.provider.load()
        satellites = self.parser.parse(raw)
        self.position_calculator = PositionCalculator()
        positions = []

        for satellite in satellites:
            position = self.position_calculator.calculate(satellite)
            positions.append(position)

        return positions