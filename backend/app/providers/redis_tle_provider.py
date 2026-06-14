from app.cache.keys import STATIONS_TLE_KEY
from app.cache.redis_client import redis_client


class RedisTLEProvider:

    def load(self) -> str | None:
        return redis_client.get(STATIONS_TLE_KEY)

    def save(self, raw_text: str) -> None:
        redis_client.set(STATIONS_TLE_KEY, raw_text, ex=7200,)