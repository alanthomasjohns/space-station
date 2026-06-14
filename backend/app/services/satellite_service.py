from app.parser import TLEParser
from app.providers.tle_provider import TLEProvider


class SatelliteService:

    def __init__(self):
        self.provider = TLEProvider()
        self.parser = TLEParser()

    async def get_satellites(self):

        raw = await self.provider.load()
        return self.parser.parse(raw)