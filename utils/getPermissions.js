import { PermissionsAndroid } from "react-native";
import { init } from "react-native-amap-geolocation";
import { AMapSdk } from "react-native-amap3d";
import { Platform } from "react-native";
// import Geolocation from '@react-native-community/geolocation';

const getPermissions = async () => {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    await init({
        android: "a90237b2130071f27a819d32f0776b0d",
        ios: "a90237b2130071f27a819d32f0776b0d",
    });
    AMapSdk.init(
        Platform.select({
            android: "a90237b2130071f27a819d32f0776b0d",
            ios: "a90237b2130071f27a819d32f0776b0d",
        })
    );
}

export default getPermissions;
