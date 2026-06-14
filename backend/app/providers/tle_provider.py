from app.providers.redis_tle_provider import RedisTLEProvider
from app.providers.celestrak_tle_provider import CelesTrakTLEProvider


class TLEProvider:

    def __init__(self):

        self.redis = RedisTLEProvider()
        self.celestrak = CelesTrakTLEProvider()

    async def load(self) -> str:

        cached = self.redis.load()
        if cached:
            print("Loaded from Redis")
            return cached

        print("Downloading from CelesTrak")
        raw = await self.celestrak.load()
        self.redis.save(raw)

        return raw