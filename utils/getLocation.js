import { Geolocation, setNeedAddress } from "react-native-amap-geolocation";
import axios from "axios";



const getLocation = async () => {
    return new Promise((resolve, reject) => {
        setNeedAddress(true);
        Geolocation.getCurrentPosition(
            (res) => {
                // console.log(res);
                const { coords, location } = res;
                const { latitude, longitude } = coords;
                // resolve({ latitude: 29.1367, longitude: 110.4616, addr: location.address })
                resolve({ latitude: latitude, longitude: longitude, addr: location.address })
            },
            (error) => {
                reject(error);
            }
        );
    })
}

const getCityByLocation = async (latitude, longitude) => {
    const res = await axios.get(`https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=b5181ec77a771113116bff071b02d136`);
    const component = res.data.regeocode.addressComponent;
    const address = res.data.regeocode.formatted_address;
    // console.log(address);
    const addressBrief = `${component.district}${component.township}`;
    // console.log(component)
    // console.log(addressBrief);
    return Promise.resolve(address);
};

const locator = {
    getLocation: getLocation,
    getCityByLocation: getCityByLocation
}

export default locator;