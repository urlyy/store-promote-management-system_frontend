import { View, Text, TextInput, Pressable, Image, ScrollView, StyleSheet, ImageBackground } from "react-native";
import tw from 'twrnc';
import PromotionItem from '../../components/PromotionItem'
import { useState, useEffect } from "react";
import TopSearch from "../../components/TopSearch";


const Main = ({ navigation }) => {
    const [promotionData, setPromotionData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    useEffect(() => {
        const datum = {
            merchantName: "微头条",
            merchantAvatar: "./avatar.jpg",
            merchantId: 1,
            text: "代发广告7天加满5000人精准客户爆单523452345234523452345234523453425推广精准被加好友十上意向客户主动加你一键投放快速加人客源在线加你微商必备 + 微信号：RRNN149149",
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
        setPromotionData([
            datum, datum, datum, datum, datum
        ])
    }, [])
    return (
        <>
            <View style={tw`h-32`}>
                <ImageBackground style={tw`flex-1 h-full`} source={require('./bg.png')} resizeMode="cover">
                    <TopSearch keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
                </ImageBackground>
            </View>
            <View style={tw`flex-1 p-2`}>
                <ScrollView>
                    <View style={tw`gap-2 bg-white`}>
                        {promotionData.map((datum, idx) => <PromotionItem key={idx} data={datum}></PromotionItem>)}
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default Main;