from app.models import SatelliteTLE


class TLEParser:
    """
    Parses raw TLE text from CelesTrak into SatelliteTLE objects.
    """

    def parse(self, raw_text: str) -> list[SatelliteTLE]:
        """
        Convert raw TLE text into a list of SatelliteTLE objects.
        """

        lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
        satellites: list[SatelliteTLE] = []

        if len(lines) % 3 != 0:
            raise ValueError("Invalid TLE format: Expected groups of three lines.")

        for i in range(0, len(lines), 3):
            name = lines[i]
            line1 = lines[i + 1]
            line2 = lines[i + 2]

            if not line1.startswith("1 "):
                raise ValueError(f"Invalid TLE Line 1 for satellite '{name}'")

            if not line2.startswith("2 "):
                raise ValueError(f"Invalid TLE Line 2 for satellite '{name}'")

            satellites.append(
                SatelliteTLE(name=name, line1=line1, line2=line2,)
            )

        return satellites