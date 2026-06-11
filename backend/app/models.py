from dataclasses import dataclass



@dataclass(slots=True)
class SatelliteTLE:
    name: str
    line1: str
    line2: str