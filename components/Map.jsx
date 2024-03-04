import { useEffect, useState } from "react";
import { MapView, MapType, Marker } from "react-native-amap3d";
// import { getLocation, getCityByLocation } from '../utils/getLocation'
import locator from '../utils/getLocation'
import Svg, { Path, SvgXml } from 'react-native-svg';
import { Text, View } from "react-native";
import tw from 'twrnc';

const PositionIcon = () => {
    const height = 25;
    const width = height;
    const svgXml = `
    <svg t="1707993575240" width="${width}" height="${height}" class="icon" viewBox="0 0 1024 1024" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" p-id="1465"><path d="M512 1024c-205.76-241.472-326.272-411.712-361.664-510.72a384 384 0 1 1 723.072 0.832C837.76 612.928 717.312 782.848 512 1024.064z m0-512a128 128 0 1 0 0-256 128 128 0 0 0 0 256z" fill="#1296db" p-id="1466"></path></svg>
  `;
    return <SvgXml xml={svgXml} />;
};

const UserIcon = () => {
    const height = 35;
    const width = height;
    const svgXml = `
    <svg t="1707995182133" width="${width}" height="${height}" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2701"><path d="M512 497c-107.696 0-195-87.304-195-195s87.304-195 195-195 195 87.304 195 195-87.304 195-195 195z m0-90c57.99 0 105-47.01 105-105S569.99 197 512 197s-105 47.01-105 105 47.01 105 105 105z" fill="#e98f36" p-id="2702"></path><path d="M512 909c-50.476 0-73.674-0.342-100.076-1.968-35.96-2.212-65.114-6.682-90.34-14.706-66.964-21.298-104.584-69.056-104.584-142.76 0-67.824 31.844-150.994 82.364-217.63C356.796 456.186 431.78 409 512 409c80.22 0 155.204 47.186 212.636 122.936 50.52 66.636 82.364 149.806 82.364 217.63 0 73.704-37.62 121.462-104.584 142.76-25.226 8.024-54.38 12.494-90.34 14.706-26.402 1.626-49.6 1.968-100.076 1.968z m0-90c93.614 0 131.32-2.32 163.138-12.44 30.786-9.792 41.862-23.854 41.862-56.994 0-46.74-24.744-111.37-64.082-163.256C610.992 531.01 560.124 499 512 499c-48.124 0-98.992 32.012-140.918 87.31-39.338 51.886-64.082 116.514-64.082 163.256 0 33.14 11.076 47.202 41.862 56.994 31.82 10.12 69.524 12.44 163.138 12.44z" fill="#e98f36" p-id="2703"></path></svg>`;
    return <SvgXml xml={svgXml} />;
}

const MyMap = ({ onSelect = ({ latitude, longitude, addr }) => { } }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    useEffect(() => {
        // locator.getLocation().then(res => {
        //     const { latitude, longitude, addr } = res;
        //     setLocation({ latitude: latitude, longitude: longitude, addr: addr });
        // })
        const latitude = 29.1364, longitude = 110.4616;
        locator.getCityByLocation(latitude, longitude).then(addr => {
            const l = {
                latitude: latitude,
                longitude: longitude,
                addr: addr,
            }
            setSelectedLocation(l);
        })
    }, [])
    const handlePress = async (res) => {
        const { latitude, longitude } = res.nativeEvent;
        setSelectedLocation({ latitude: latitude, longitude: longitude, addr: "" });
        const addr = await locator.getCityByLocation(latitude, longitude);
        setSelectedLocation({ latitude: latitude, longitude: longitude, addr: addr });
        onSelect({ latitude, longitude, addr });
    }
    return (
        <MapView
            onPress={handlePress}
            mapType={MapType.Bus}
            initialCameraPosition={{
                target: {
                    // latitude: location.latitude,
                    // longitude: location.longitude,
                    latitude: 29.1364,    //纬度 
                    longitude: 110.4616
                },
                zoom: 20,
            }}
        >
            <Marker position={{ latitude: 29.1364, longitude: 110.4616 }}>
                <View style={tw`items-center`}>
                    <Text style={tw`text-black`}>当前位置</Text>
                    <UserIcon />
                </View>
            </Marker>

            {selectedLocation && <Marker position={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}>
                <View style={tw`items-center`}>
                    <Text style={tw`w-36 text-black`}>{selectedLocation.addr}</Text>
                    <PositionIcon />
                </View>
            </Marker>}
        </MapView >
    )
};

export default MyMap;
