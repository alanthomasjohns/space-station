import { useEffect } from "react";
import { Viewer, Cartesian3, Color } from "cesium";


function Globe() {
    useEffect(() => {
        const viewer = new Viewer("cesium-container");
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(latitude, longitude);
            viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(
                    longitude,
                    latitude,
                    1500000
                ),
            });
            viewer.entities.add({
                position: Cartesian3.fromDegrees(
                    longitude,
                    latitude,
                    0,
                ),

                point: {
                    pixelSize: 7,
                    color: Color.DODGERBLUE,
                },
            });
        });
    }, []);
    return (<div id="cesium-container" style={{ width: "100%", height: "600px" }} />);
}

export default Globe;