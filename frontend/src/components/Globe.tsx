import { useEffect } from "react";
import { Viewer, Cartesian2 , Cartesian3, Color } from "cesium";
import { getSatellites } from "../api/satellites";


function Globe() {
    function flyToLocation(viewer: Viewer, latitude: number,longitude: number,) 
    {
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(
                longitude,
                latitude,
                1500000,
            ),
        });
    }

    function addUserMarker(viewer: Viewer, latitude: number, longitude: number,)
    {
        viewer.entities.add({
            position: Cartesian3.fromDegrees(
                longitude,
                latitude,
                0,
            ),

            point: {pixelSize: 10, color: Color.DODGERBLUE, outlineColor: Color.WHITE, outlineWidth: 2},

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

    function addSatellite(viewer: Viewer, name: string, latitude: number,longitude: number, altitudeKm: number,)
    {
        viewer.entities.add(
            {
                position: Cartesian3.fromDegrees(
                longitude,
                latitude,
                altitudeKm * 1000
                ),
                point: {
                    pixelSize: 5,
                    color: Color.RED
                },
                label: {
                    text: name,
                    pixelOffset: new Cartesian2(0, -10),
                    fillColor: Color.WHITE,
                    outlineColor: Color.BLACK,
                    outlineWidth: 2,
                    showBackground: true,
                    backgroundColor: Color.BLACK.withAlpha(0.25),
                },
            }
        );
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
        navigator.geolocation.getCurrentPosition(async(position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            flyToLocation(viewer, latitude, longitude,);
            addUserMarker(viewer, latitude, longitude,);
            const satellites = await getSatellites();
            for (const satellite of satellites) {
                addSatellite(
                    viewer,
                    satellite.name,
                    satellite.latitude,
                    satellite.longitude,
                    satellite.altitude_km,
                );
            }
        });
    }, []);
    return (<div id="cesium-container" style={{ width: "100%", height: "600px" }} />);
}

export default Globe;