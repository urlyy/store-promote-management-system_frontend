import { View, Image, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import tw from 'twrnc';
import { Col, Row, Grid } from "react-native-easy-grid";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'


const PromotionDetail = ({ route }) => {
    const promotionId = route.id;
    const [data, setData] = useState({});
    const navigation = useNavigation();
    useEffect(() => {
        const datum = {
            merchantName: "微头条",
            merchantAvatar: "./avatar.jpg",
            merchantBrief: "我的简介我的简介",
            merchantId: 1,
            text: "代发广告7天加满5000人精准12341234123412341234123412341234123412341234客户爆单推广精准被加好友十上意向客户主动加你一键投放快速加人客源在线加你微商必备 + ",
            images: ["./avatar.jpg", "./avatar.jpg", "./avatar.jpg", "./avatar.jpg"],
            isTop: true,
            uv: 11644,
            createTime: "4分钟前",
            like: 1444,
            comments: [
                { userId: 1, username: "哈哈哈", text: "确实确实", createTime: "2023-12-11 20:50" },
                { userId: 1, username: "哈哈哈", text: "确实确实", createTime: "2023-12-11 20:50" },
                { userId: 1, username: "哈哈哈", text: "确实确实", createTime: "2023-12-11 20:50" }
            ]
        }
        setData(datum);
    }, []);
    //左闭右闭
    const range = (start, end) => {
        const res = Array.from({ length: end - start + 1 }, (_, index) => start + index);
        return res;
    }
    console.log("qwerqwer")
    return (
        <ScrollView>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>详情</Text>
            </View>
            <View style={tw` flex-1 gap-1 rounded-sm p-1 border-b-[#f7f7f7] border-b-4`}>
                <View style={tw`flex-row gap-1 bg-white`}>
                    <Pressable onPress={() => { navigation.navigate('Profile') }}>
                        <Image style={tw`w-20 h-20 rounded-md`} source={require('./avatar.jpg')}></Image>
                    </Pressable>
                    <View style={tw`justify-around`}>
                        <Text style={tw`text-lg text-black`}>{data.merchantName}</Text>
                        <Text style={tw`text-lg`}>{data.merchantBrief}</Text>
                        <Text style={tw`text-lg`}>{data.createTime}</Text>
                    </View>
                </View>
                <View style={tw`flex-1 gap-1`}>
                    {data.isTop && <Text style={tw`text-lg text-white bg-red-500`}>置顶</Text>}
                    <Text style={tw`text-xl bg-white`}>{data.text}</Text>
                    <View>
                        {data.images && data.images.length > 0 && range(0, Math.ceil(data.images.length / 3) - 1).map((_, rowIdx) =>
                        (
                            <View style={tw`w-full flex-row bg-white gap-2`}>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 < data.images.length && <Pressable>
                                        <Image style={tw`w-full `} source={require('./avatar.jpg')}></Image>
                                    </Pressable>}
                                </View>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 + 1 < data.images.length && <Pressable>
                                        <Image style={tw`w-full `} source={require('./avatar.jpg')}></Image>
                                    </Pressable>}
                                </View>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 + 2 < data.images.length && <Pressable>
                                        <Image style={tw`w-full `} source={require('./avatar.jpg')}></Image>
                                    </Pressable>}
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={tw`flex-row bg-white`}>
                        <View>
                            <Text style={tw`text-lg`}>{data.uv}人浏览,{data.like}人点赞</Text>
                            <Text style={tw`text-lg`}>发布于{data.createTime}</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white`}>
                        <View style={tw`flex-row border-b-2 border-b-[#f7f7f7]`}>
                            <Text style={tw`text-2xl text-black`}>全部评论</Text>
                            <Pressable style={tw`ml-auto`}>
                                <Text style={tw`text-black text-xl`}>发送评论</Text>
                            </Pressable>
                        </View>
                        <View>
                            {data.comments == undefined || data.comments.length == 0 ? <Text style={tw`text-center text-xl`}>暂无评论</Text> : data.comments.map((comment, idx) => (
                                <View key={idx} style={tw`flex-row pl-2 pr-2 pt-2 gap-1 w-full`}>
                                    <Pressable style={tw`w-14 h-14`} onPress={() => { navigation.navigate('Profile') }}>
                                        <Image style={tw`w-full h-full rounded-full`} source={require('./avatar.jpg')}></Image>
                                    </Pressable>
                                    <View style={tw`flex-1 border-b-2 border-b-[#f7f7f7] justify-around`}>
                                        <View style={tw`flex-row`}>
                                            <Text style={tw`text-lg text-yellow-600`}>{comment.username}</Text>
                                            <Text style={tw`ml-auto text-lg`}>{comment.createTime}</Text>
                                        </View>
                                        <View><Text style={tw`text-lg`}>{comment.text}</Text></View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View >
        </ScrollView>

    )
}


export default PromotionDetail;