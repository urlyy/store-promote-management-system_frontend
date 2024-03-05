import { Text, View, Pressable } from "react-native";
import tw from 'twrnc';
import { useRef, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import request from '../utils/request'
import userStore from "../stores/user";




const BottomBar = ({ }) => {
    const navigation = useNavigation();
    const { unread } = userStore();
    const [activeIdx, setActiveIdx] = useState(0);
    const items = useRef([
        { text: "首页", to: "Home" },
        { text: "关注", to: "FollowPromotion" },
        { text: "消息", to: "Notification" },
        { text: "我的", to: "Mine" },
    ]);
    return (
        <View style={tw`flex-row bg-white h-13 `}>
            {items.current.map((item, idx) => (
                <Pressable style={tw`flex-1 items-center justify-center flex-row`} key={idx} onPress={() => { navigation.navigate(item.to); setActiveIdx(idx); }}>
                    <Text style={tw`text-xl flex-row ${activeIdx == idx ? "text-blue-400" : "text-black"}`}>
                        {item.text}
                    </Text>
                    {item.to == "Notification" && unread > 0 && <Text style={tw`text-red-500 font-bold text-lg`}>{unread}</Text>}
                </Pressable>
            ))}
        </View>
    )
}
export default BottomBar;