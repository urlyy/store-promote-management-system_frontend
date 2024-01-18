import { MapView, MapType } from "react-native-amap3d";


const Map = ({ latitude, longitude }) => {
    return (
        <MapView
            mapType={MapType.Standard}
            initialCameraPosition={{
                target: {
                    latitude: latitude,
                    longitude: longitude,
                },
                zoom: 8,
            }}
        />
    )
};

export default Map;
