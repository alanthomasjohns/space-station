import { useEffect } from "react";
import { Viewer, Cartesian2, Cartesian3, Color } from "cesium";

import { getSatellites } from "../api/satellites";
import type { Satellite } from "../types/satellite";

function Globe() {
    function flyToLocation(
        viewer: Viewer,
        latitude: number,
        longitude: number,
    ) {
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(
                longitude,
                latitude,
                1_500_000,
            ),
        });
    }

    function addUserMarker(
        viewer: Viewer,
        latitude: number,
        longitude: number,
    ) {
        viewer.entities.add({
            id: "user",

            position: Cartesian3.fromDegrees(
                longitude,
                latitude,
                0,
            ),

            point: {
                pixelSize: 10,
                color: Color.DODGERBLUE,
                outlineColor: Color.WHITE,
                outlineWidth: 2,
            },

            label: {
                text: "You are here",
                pixelOffset: new Cartesian2(0, -28),
                fillColor: Color.WHITE,
                outlineColor: Color.BLACK,
                outlineWidth: 2,
                showBackground: true,
                backgroundColor: Color.BLACK.withAlpha(0.25),
            },
        });
    }

    function addOrUpdateSatellite(
        viewer: Viewer,
        satellite: Satellite,
    ) {
        const entity = viewer.entities.getById(satellite.name);

        if (entity) {
            entity.position = Cartesian3.fromDegrees(
                satellite.longitude,
                satellite.latitude,
                satellite.altitude_km * 1000,
            );

            return;
        }

        viewer.entities.add({
            id: satellite.name,

            position: Cartesian3.fromDegrees(
                satellite.longitude,
                satellite.latitude,
                satellite.altitude_km * 1000,
            ),

            point: {
                pixelSize: 5,
                color: Color.RED,
            },

            label: {
                text: satellite.name,
                pixelOffset: new Cartesian2(0, -10),
                fillColor: Color.WHITE,
                outlineColor: Color.BLACK,
                outlineWidth: 2,
                showBackground: true,
                backgroundColor: Color.BLACK.withAlpha(0.25),
            },

            properties: {
                altitudeKm: satellite.altitude_km,
            },

            description: `
                <h3>${satellite.name}</h3>
                <p>Altitude: ${satellite.altitude_km.toFixed(1)} km</p>
            `,
        });
    }

    async function refreshSatellites(viewer: Viewer) {
        const satellites = await getSatellites();

        for (const satellite of satellites) {
            addOrUpdateSatellite(viewer, satellite);
        }
    }

    useEffect(() => {
        const viewer = new Viewer("cesium-container", {
            animation: false,
            timeline: false,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            fullscreenButton: false,
        });

        viewer.selectedEntityChanged.addEventListener((entity) => {
            if (!entity) {
                return;
            }

            console.log(entity.id);
        });

        let intervalId: number;

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            flyToLocation(viewer, latitude, longitude);
            addUserMarker(viewer, latitude, longitude);

            await refreshSatellites(viewer);

            intervalId = window.setInterval(() => {
                refreshSatellites(viewer);
            }, 5000);
        });

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }

            viewer.destroy();
        };
    }, []);

    return (
        <div
            id="cesium-container"
            style={{
                width: "100%",
                height: "600px",
            }}
        />
    );
}

export default Globe;