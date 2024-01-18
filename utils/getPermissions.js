import { PermissionsAndroid } from "react-native";
import { init, Geolocation, setNeedAddress } from "react-native-amap-geolocation";
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
    // Geolocation.getCurrentPosition(({ coords }) => {
    //     const { latitude, longitude } = coords;
    // });
    // Geolocation.requestAuthorization();
    // 获取当前地理位置
    // const watchId = Geolocation.watchPosition(
    //     position => {
    //         const { latitude, longitude } = position.coords;
    //         setLocation({ latitude, longitude });
    //     },
    //     error => {
    //         console.error(error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
}

export default getPermissions;
