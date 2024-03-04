import { Text, View, Pressable } from "react-native";
import tw from 'twrnc';
import { useRef, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import request from '../utils/request'


const NotificationPolling = ({ onChange }) => {
    const getUnreadNotifications = async (userId) => {
        const res = await request.get('/notification/count/unread')
        return res.data.data;
    }
    useEffect(() => {
        let intervalId = null;
        // 首次加载数据
        // getUnreadNotifications().then(res => {
        //     onChange(res.unread_cnt);
        //     // 设置定时器，每隔3分钟请求一次数据
        //     intervalId = setInterval(() => {
        //         getUnreadNotifications();
        //     }, 3 * 60 * 1000); // 3分钟
        // })
        // 在组件卸载时清除定时器
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <></>
    )
}


const BottomBar = ({ }) => {
    const navigation = useNavigation();
    const [activeIdx, setActiveIdx] = useState(0);
    const [unreadNotificationCnt, setUnreadNotificationCnt] = useState(0);
    const items = useRef([
        { text: "首页", to: "Home" },
        { text: "关注", to: "FollowPromotion" },
        { text: "消息", to: "Notification" },
        { text: "我的", to: "Mine" },
    ]);
    return (
        <View style={tw`flex-row bg-white h-13 `}>
            <NotificationPolling cnt={unreadNotificationCnt} onChange={setUnreadNotificationCnt}></NotificationPolling>
            {items.current.map((item, idx) => (
                <Pressable style={tw`flex-1 items-center justify-center flex-row`} key={idx} onPress={() => { navigation.navigate(item.to); setActiveIdx(idx); }}>
                    <Text style={tw`text-xl flex-row ${activeIdx == idx ? "text-blue-400" : "text-black"}`}>
                        {item.text}
                    </Text>
                    {item.to == "Notification" && <Text style={tw`text-red-500 font-bold text-lg`}>{unreadNotificationCnt}</Text>}
                </Pressable>
            ))}
        </View>
    )
}
export default BottomBar;