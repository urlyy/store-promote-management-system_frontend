import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect } from 'react'
import api from './api'
import { useNavigation } from '@react-navigation/native';
import userStore from '../../stores/user';

const Follow = () => {
    const navigation = useNavigation();
    const { id } = userStore();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.getFollowList(id).then((res) => {
            const users = res.users;
            setData(users.map(u => ({
                ...u, follow: true,
            })))
        })
    }, []);
    const follow = async (idx) => {
        const user = data[idx];
        const res = await api.follow(user.id)
        if (res.success == true) {
            const newData = JSON.parse(JSON.stringify(data))
            newData[idx].follow = true;
            setData(newData);
        }

    }
    const followCancel = async (idx) => {
        const user = data[idx];
        const res = await api.followCancel(user.id)
        if (res.success == true) {
            const newData = JSON.parse(JSON.stringify(data))
            newData[idx].follow = false;
            setData(newData);
        }
    }
    return (
        <View style={tw`bg-white w-full`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>我的关注列表</Text>
            </View>
            <ScrollView style={tw``}>
                {data.length == 0 ?
                    (<View style={tw` items-center w-full`}><Text style={tw`flex text-black text-2xl`}>还没关注任何人哦</Text></View>) :
                    (
                        data.map((datum, idx) => (
                            <View key={idx} style={tw`p-2 flex-row gap-1 border-b-[#f7f7f7] border-b-4`}>
                                <Pressable style={tw`w-16 h-16`} onPress={() => navigation.navigate("Profile", { userId: datum.id })}>
                                    {datum.avatar && <Image style={tw`w-full h-full rounded-full`} source={{ uri: datum.avatar }}></Image>}
                                </Pressable>
                                <View style={tw`flex-1 items-center flex-row`}>
                                    <View style={tw`justify-around`}>
                                        <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                        <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                    </View>
                                    {/* <View style={tw`items-center`}>
                                        <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                        <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                    </View> */}
                                    <View style={tw`ml-auto `}>
                                        {datum.follow ?
                                            (<Pressable style={tw`p-1 bg-white border border-black rounded-2xl`} onPress={() => { followCancel(idx) }}><Text style={tw`text-2xl text-black`}>取消关注</Text></Pressable>) :
                                            (<Pressable style={tw`p-1 bg-yellow-400 rounded-2xl`} onPress={() => { follow(idx) }}><Text style={tw`text-2xl text-black`}>关注</Text></Pressable>)
                                        }
                                    </View>
                                </View>
                            </View>
                        ))
                    )
                }
            </ScrollView>
        </View>
    )
}
export default Follow;