import { View, Text, TextInput, Pressable, Image, ScrollView, StyleSheet, ImageBackground } from "react-native";
import tw from 'twrnc';

import { useState, useEffect, useRef } from "react";
import TopSearch from "../../components/TopSearch";
import api from './api'
import userStore from "../../stores/user";
import PromotionArea from "../../components/promotionArea/PromotionArea";

const Main = ({ navigation }) => {
    const { username } = userStore();
    const [promotions, setPromotions] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    // const unsubscribe = navigation.addListener('focus', () => {
    //     console.log("进来了");
    // });


    useEffect(() => {
        api.getRecommendPromotions().then(async (res) => {
            const promotions = res.promotions;
            setPromotions(promotions);
        })
        // api.getRecommendPromotions().then(async (res) => {
        //     const promotions = res.promotions;
        //     //先根据id拿到用户
        //     const userIds = new Set();
        //     promotions.forEach(item => {
        //         const { id, imgs, text, is_top, create_time, user_id } = item;
        //         userIds.add(user_id);
        //     })
        //     const promises = [...userIds].map(id => api.getUser(id));
        //     const responses = await Promise.all(promises);
        //     // 处理每个 Promise 解决后的结果
        //     responses.forEach((resp, index) => {
        //         const thisGuy = resp.user;
        //         id2user.current[thisGuy.id] = thisGuy;
        //     });
        //     //再set推广
        //     setPromotionData(promotions.map(item => {
        //         const merchant = id2user.current[item.user_id];
        //         return {
        //             id: item.id,
        //             merchantName: merchant.username,
        //             merchantAvatar: merchant.avatar,
        //             merchantId: merchant.id,
        //             text: item.text,
        //             imgs: item.imgs,
        //             isTop: item.is_top,
        //             uv: 11644,
        //             createTime: item.create_time,
        //             like: 1444,
        //             comments: [
        //                 // { userId: 1, username: "哈哈哈", text: "确实确实" },
        //                 // { userId: 1, username: "哈哈哈", text: "确实确实" },
        //                 // { userId: 1, username: "哈哈哈", text: "确实确实" }
        //             ]
        //         }
        //     }))
        // })
        // const datum = {
        //     merchantName: "微头条",
        //     merchantAvatar: "./avatar.jpg",
        //     merchantId: 1,
        //     text: "代发广告7天加满5000人精准客户爆单523452345234523452345234523453425推广精准被加好友十上意向客户主动加你一键投放快速加人客源在线加你微商必备 + 微信号：RRNN149149",
        //     images: ["./avatar.jpg", "./avatar.jpg", "./avatar.jpg", "./avatar.jpg"],
        //     isTop: true,
        //     uv: 11644,
        //     createTime: "4分钟前",
        //     like: 1444,
        //     comments: [
        //         { userId: 1, username: "哈哈哈", text: "确实确实" },
        //         { userId: 1, username: "哈哈哈", text: "确实确实" },
        //         { userId: 1, username: "哈哈哈", text: "确实确实" }
        //     ]
        // }
        // setPromotionData([
        //     datum, datum, datum, datum, datum
        // ])
        // return () => {
        //     unsubscribe;
        // }
    }, [])
    // const handleSendComment = async (idx, commentInput) => {
    //     const modifiedDatum = promotionData[idx];
    //     setShowCommentInputIdx(-1);
    //     const res = await api.sendComment(commentInput, modifiedDatum.id);
    //     const { user_id, text, create_time } = res.comment;
    //     const newComment = {
    //         userId: user_id,
    //         text: text,
    //         createTime: create_time,
    //         username: username,
    //     };
    //     modifiedDatum.comments = [...modifiedDatum.comments, newComment];
    //     const newPromotionData = [...promotionData];
    //     newPromotionData[idx] = modifiedDatum;
    //     setPromotionData(newPromotionData);
    // }
    return (
        <>
            <View style={tw`h-32`}>
                <ImageBackground style={tw`flex-1 h-full`} source={require('./bg.png')} resizeMode="cover">
                    <TopSearch keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
                </ImageBackground>
            </View>

            <PromotionArea promotions={promotions}></PromotionArea>

        </>
    )
}

export default Main;