import type { Satellite } from "../types/satellite";


const API_BASE_URL = "http://127.0.0.1:8000";

export async function getSatellites(): Promise<Satellite[]> {
    const response = await fetch(`${API_BASE_URL}/satellites`);
    if (!response.ok) {
        throw new Error("Failed to fetch satellites");
    }

    return response.json();
}