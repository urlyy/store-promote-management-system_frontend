import { View, Text, Image, Pressable } from "react-native";
import tw from 'twrnc';
import { useEffect, useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';



const NavigateButton = ({ text, to, navigation }) => {
    return (
        <Pressable style={tw`flex-1 items-center h-24 justify-center`} onPress={() => { navigation.navigate(to) }}>
            <Text style={tw`text-2xl`}>{text}</Text>
        </Pressable>
    )
}

const Profile = () => {
    const [data, setData] = useState({});
    const navigation = useNavigation();
    useEffect(() => {
        const user = {
            username: "马鹿",
            avatar: "",
            id: 1234,
            coin: 1234
        }
        setData(user);
    }, []);
    return (
        <View style={tw`flex-1 gap-2`}>
            <View style={tw`flex-row bg-yellow-500 p-2 gap-2 items-center`}>
                <Image style={tw`rounded-full border-4 border-white h-24 w-24`} source={require('./avatar.jpg')}></Image>
                <View>
                    <Text style={tw`text-white font-bold text-2xl`}>{data.username}</Text>
                    <Text style={tw`text-white font-bold text-2xl`}>ID:{data.id}</Text>
                    <Text style={tw`text-white font-bold text-2xl`}>金币:{data.coin}</Text>
                </View>
                <Pressable style={tw`ml-auto`} onPress={() => { navigation.navigate('Profile') }}>
                    <View >
                        <Text style={tw`text-white text-2xl`}>详情{">"}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={tw`bg-white p-2`}>
                <Text style={tw`text-2xl border-b-4 border-b-[#f7f7f7] items-center font-bold`}>服务</Text>
                <View style={tw`flex-row items-center`}>
                    <NavigateButton text="我的推广" to="PromotionManage" navigation={navigation}></NavigateButton>
                    <NavigateButton text="我的关注" to="Follow" navigation={navigation}></NavigateButton>
                    <NavigateButton text="发布推广" to="Promotion" navigation={navigation}></NavigateButton>
                </View>
            </View>
            <View></View>
        </View>
    )
}
export default Profile;