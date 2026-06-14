import type { Satellite } from "../types/satellite";

interface SatelliteListProps {
    satellites: Satellite[];
}

function SatelliteList({ satellites }: SatelliteListProps) {
    return (
        <ul>
            {satellites.map((satellite) => (
                <li key={satellite.name}>
                    {satellite.name}
                </li>
            ))}
        </ul>
    );
}

export default SatelliteList;