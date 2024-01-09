import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect } from 'react'
const Follow = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const datum = {
            username: "qwer",
            avatar: "qwer",
            brief: "简介哦",
            isFollowed: true
        }
        setData([datum, datum]);
    }, []);
    const follow = (idx) => {
        const newData = JSON.parse(JSON.stringify(data))
        newData[idx].isFollowed = true;
        setData(newData);
    }
    const followCancel = (idx) => {
        const newData = JSON.parse(JSON.stringify(data))
        newData[idx].isFollowed = false;
        setData(newData);
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
                                <View>
                                    <Image style={tw`w-20 h-20 rounded-full`} source={require('./avatar.jpg')}></Image>
                                </View>
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
                                        {datum.isFollowed ?
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