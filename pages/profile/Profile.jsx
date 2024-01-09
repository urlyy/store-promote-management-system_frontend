import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import PromotionItem from '../../components/PromotionItem';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
const Profile = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({ promotions: [] });
    useEffect(() => {
        const datum = {
            merchantName: "微头条",
            merchantAvatar: "./avatar.jpg",
            merchantId: 1,
            text: "代发广告7天加满5000人精准客户爆单推广精准被加好友十上意向客户主动加你一键投放快速加人客源在线加你微商必备 + 微信号：RRNN149149",
            images: ["./avatar.jpg", "./avatar.jpg", "./avatar.jpg", "./avatar.jpg"],
            isTop: true,
            uv: 11644,
            createTime: "4分钟前",
            like: 1444,
            comments: [
                { userId: 1, username: "哈哈哈", text: "确实确实" },
                { userId: 1, username: "哈哈哈", text: "确实确实" },
                { userId: 1, username: "哈哈哈", text: "确实确实" }
            ]
        }
        const promotionData = [
            datum, datum, datum, datum, datum
        ]
        const user = {
            username: "qwer",
            brief: "asdf",
            avatar: "",
            promotions: promotionData
        }
        setData(user);
    }, [])
    return (
        <View>
            <View style={tw`flex-row gap-2 h-32 items-center relative`}>
                <Image blurRadius={2} style={tw`w-full h-full -z-10 absolute`} source={require('./avatar.jpg')}></Image>
                {/* <View style={tw`a`}></View> */}
                <View>
                    <Image style={tw`rounded-full w-20 h-20`} source={require('./avatar.jpg')}></Image>
                    <Pressable onPress={() => navigation.navigate("Message")} style={tw`items-center bg-yellow-400 p-1 rounded-lg`}>
                        <Text style={tw`text-xl text-white font-bold`}>私信</Text>
                    </Pressable>
                </View>
                <View style={tw`flex-1 relative h-full justify-center`}>
                    {/* <Text>12341234</Text> */}
                    <View style={tw`bg-white w-full h-20 opacity-80 absolute -z-10 rounded-lg`}></View>
                    <Text style={tw`text-xl text-black`}>{data.username}</Text>
                    <Text style={tw`text-xl text-black`}>简介:{data.brief}</Text>
                    <Text style={tw`text-xl text-black`}>发布:{data.promotions.length}</Text>
                </View>
            </View>
            <ScrollView style={tw`p-2`}>
                <View style={tw`gap-2 bg-white`}>
                    {data.promotions.map((datum, idx) => <PromotionItem key={idx} data={datum}></PromotionItem>)}
                </View>
            </ScrollView>
        </View>
    )
}
export default Profile;