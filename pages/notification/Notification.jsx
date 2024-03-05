import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import api from './api'
import dateFormat from '../../utils/dateFormat';
import userStore from "../../stores/user"


const Notification = () => {
    const navigation = useNavigation();
    const setUnread = userStore(state => state.setUnread);
    const [data, setData] = useState([]);
    const getType = (code) => {
        if (code == 0) {
            return "系统消息"
        } else if (code == 1) {
            return "私信消息"
        } else if (code == 5) {
            return "新推送消息"
        }
    }
    useEffect(() => {
        api.getNotifications().then((res) => {
            const notifications = res.notifications;
            setData(notifications);
            setUnread(0);
        })
    }, [])
    const handleClick = (idx) => {
        const note = data[idx];
        const param = note.param;
        if (note.type == 1) {
            const senderId = param.senderId;
            navigation.navigate("PrivateMessage", { userId: senderId });
        } else if (note.type == 5) {
            const promotionId = param.promotionId;
            const merchantId = param.merchantId;
            navigation.navigate("PromotionDetail", { promotionId: promotionId, merchantId: merchantId })
        }
    }
    return (
        <View style={tw`bg-white w-full`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>消息</Text>
                <Pressable style={tw`absolute right-0 mr-2`} onPress={() => { }}>
                    <Text style={tw`text-white text-xl`}>清空</Text>
                </Pressable>
            </View>
            <ScrollView style={tw``}>
                {data.length == 0 ?
                    (<View style={tw` items-center w-full`}><Text style={tw`flex text-black text-2xl`}>没有消息</Text></View>) :
                    (
                        data.map((datum, idx) => (
                            <Pressable onPress={handleClick.bind(null, idx)} key={idx} style={tw`p-2 flex-row gap-1 border-b-[#f7f7f7] border-b-4`}>
                                {/* <View>
                                    <Image style={tw`w-20 h-20 rounded-full`} source={require('./avatar.jpg')}></Image>
                                </View> */}
                                <View style={tw` flex-1 justify-around`}>
                                    <View style={tw`flex-row`}>
                                        <Text style={tw`text-xl text-black`}>{getType(datum.type)}</Text>
                                        <Text style={tw`text-xl ml-auto`}>{datum.createTime}</Text>
                                    </View>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={tw`w-full text-xl`}>{datum.text}</Text>
                                </View>
                            </Pressable>
                        ))
                    )
                }
            </ScrollView>
        </View >
    )
}
export default Notification;