import { useEffect } from "react";
import { Viewer, Cartesian2 , Cartesian3, Color } from "cesium";


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
        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            flyToLocation(viewer, latitude, longitude,);
            addUserMarker(viewer, latitude, longitude,);
        });
    }, []);
    return (<div id="cesium-container" style={{ width: "100%", height: "600px" }} />);
}

export default Globe;