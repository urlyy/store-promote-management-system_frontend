import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import api from './api'
import userStore from '../../stores/user';
import dateFormat from '../../utils/dateFormat';
const Notification = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const id2username = useRef({});
    useEffect(() => {
        // const datum = {
        //     title: "系统消息",
        //     text: "qweokryhqwhkejrgbvqwhiergbqwihuergb刘宇阳刘宇阳刘宇阳刘宇阳",
        //     avatar: "",
        //     createTime: "昨天 08:15"
        // }
        // setData([datum, datum, datum]);
        const getType = (code) => {
            if (code == 0) {
                return "系统消息"
            } else if (code == 1) {
                return "私信消息"
            }
        }
        const getText = (typeCode, text, param) => {
            if (typeCode == 1) {
                return (<>
                    <Text style={tw`text-red-500`}>{`${id2username.current[param.sender_id]}`}</Text>
                    <Text>给你发私信了</Text>
                </>)
            }
        }
        api.getNotifications().then(async (res) => {
            // console.log(res)
            const notifications = res.notifications;
            const userIds = new Set();
            notifications.forEach(item => {
                if (item.param.sender_id) {
                    userIds.add(item.param.sender_id);
                }
            })
            const promises = [...userIds].map(id => api.getUser(id));
            const responses = await Promise.all(promises);
            responses.forEach((res) => {
                const user = res.user;
                id2username.current[user.id] = user.username;
            });
            setData(notifications.map(item => ({
                title: getType(item.type),
                text: getText(item.type, item.text, item.param),
                createTime: dateFormat(item.create_time),
            })))
        })
    }, [])
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
                            <Pressable onPress={() => { console.log("可能有多种变化") }} key={idx} style={tw`p-2 flex-row gap-1 border-b-[#f7f7f7] border-b-4`}>
                                {/* <View>
                                    <Image style={tw`w-20 h-20 rounded-full`} source={require('./avatar.jpg')}></Image>
                                </View> */}
                                <View style={tw` flex-1 justify-around`}>
                                    <View style={tw`flex-row`}>
                                        <Text style={tw`text-xl text-black`}>{datum.title}</Text>
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