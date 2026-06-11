import httpx

from backend.app.config import (
    CELESTRAK_BASE_URL,
    DEFAULT_GROUP,
    DEFAULT_FORMAT,
)

from backend.app.parser import TLEParser
from backend.app.models import SatelliteTLE


class SatelliteService:

    def __init__(self):
        self.parser = TLEParser()

    async def get_satellites(self) -> list[SatelliteTLE]:
        """
        Fetch and parse the latest satellite TLE data.
        """

        url = (
            f"{CELESTRAK_BASE_URL}/gp.php"
            f"?GROUP={DEFAULT_GROUP}"
            f"&FORMAT={DEFAULT_FORMAT}"
        )

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)
            response.raise_for_status()

        return self.parser.parse(response.text)