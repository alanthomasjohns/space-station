import httpx

from app.config import (
    CELESTRAK_BASE_URL,
    DEFAULT_GROUP,
    DEFAULT_FORMAT,
)

from app.parser import TLEParser
from app.models import SatelliteTLE
from app.providers.file_tle_provider import TLEProvider


class SatelliteService:

    def __init__(self):
        self.parser = TLEParser()
        self.provider = TLEProvider()

    async def get_satellites(self) -> list[SatelliteTLE]:
        """
        Fetch and parse the latest satellite TLE data.
        """
        raw_text = self.provider.load()
        satellites = self.parser.parse(raw_text)
        return satellites
        # url = (
        #     f"{CELESTRAK_BASE_URL}/gp.php"
        #     f"?GROUP={DEFAULT_GROUP}"
        #     f"&FORMAT={DEFAULT_FORMAT}"
        # )

        # async with httpx.AsyncClient(timeout=10) as client:
        #     response = await client.get(url)
        #     response.raise_for_status()

        # return self.parser.parse(response.text)