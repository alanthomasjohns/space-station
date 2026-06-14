from pathlib import Path


class TLEProvider:
    """
    Provides raw TLE data.
    """

    def load(self) -> str:
        data_path = Path(__file__).parent.parent.parent / "data" / "stations.tle"

        return data_path.read_text(encoding="utf-8")