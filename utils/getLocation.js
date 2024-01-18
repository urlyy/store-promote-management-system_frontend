import { init, Geolocation, setNeedAddress } from "react-native-amap-geolocation";


const getLocation = async () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                resolve({ latitude, longitude })
            },
            (error) => {
                reject(error);
            }
        );
    })
}

export default getLocation;