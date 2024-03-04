import { View, Pressable, Text, Alert } from 'react-native';
import Map from '../../components/Map'
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import api from './api';
import userStore from '../../stores/user';


const MerchantPosition = ({ }) => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const setLocation = userStore(state => state.setLocation);
    const handleSelect = ({ latitude, longitude, addr }) => {
        setSelected({ latitude, longitude, addr })
    }
    const handleConfirm = async () => {
        const res = await api.updateLocation(selected);
        if (res.success == true) {
            setLocation(selected.latitude, selected.longitude);
            Alert.alert(
                '修改店铺定位成功',
                '',
                [
                    { text: '返回主页', onPress: () => { navigation.navigate("Mine"); } }
                ],
            );
        } else {

        }
    }
    const handleCancel = () => {
        navigation.navigate('Mine')
    }
    return (
        <>
            <Map onSelect={handleSelect}></Map>
            <View style={tw`h-14 justify-around flex-row items-center bg-white p-1`}>
                {selected !== null && <Pressable onPress={handleConfirm} style={tw`w-32 h-full justify-center items-center border rounded-lg p-2`}>
                    <Text style={tw`text-2xl`}>定位到此</Text>
                </Pressable>}
                <Pressable onPress={handleCancel} style={tw`w-32 h-full justify-center items-center border rounded-lg p-2`}>
                    <Text style={tw`text-2xl`}>取消</Text>
                </Pressable>

            </View>
        </>
    )
}

export default MerchantPosition;