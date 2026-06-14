import httpx

from app.config import (
    CELESTRAK_BASE_URL,
    DEFAULT_FORMAT,
    DEFAULT_GROUP,
)


class CelesTrakTLEProvider:

    async def load(self) -> str:

        url = (
            f"{CELESTRAK_BASE_URL}/gp.php"
            f"?GROUP={DEFAULT_GROUP}"
            f"&FORMAT={DEFAULT_FORMAT}"
        )

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)
            response.raise_for_status()

        return response.text