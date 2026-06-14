import { useEffect, useState } from "react";

import { getSatellites } from "./api/satellites";
import SatelliteList from "./components/SatelliteList";
import Globe from "./components/Globe";
import type { Satellite } from "./types/satellite";

function App() {
    const [satellites, setSatellites] = useState<Satellite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSatellites() {
            try {
                const data = await getSatellites();
                setSatellites(data);
            } catch {
                setError("Failed to fetch satellites.");
            } finally {
                setLoading(false);
            }
        }

        loadSatellites();
    }, []);

    if (loading) {
        return <h2>Loading satellites...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>🛰 Space Station Tracker</h1>

            <Globe />
        </div>
    );
}

export default App;