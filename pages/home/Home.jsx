import { View, Text, TextInput, Pressable, Image, ScrollView, StyleSheet, ImageBackground } from "react-native";
import tw from 'twrnc';

import { useState, useEffect, useRef } from "react";
import TopSearch from "../../components/TopSearch";
import api from './api'
import userStore from "../../stores/user";
import PromotionArea from "../../components/promotionArea/PromotionArea";
import locator from "../../utils/getLocation";


const Main = ({ navigation }) => {
    const { username, currentLocation } = userStore();
    const [promotionPageNum, setPromotionPageNum] = useState(1);
    const [promotions, setPromotions] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    // const unsubscribe = navigation.addListener('focus', () => {
    //     console.log("进来了");
    // });
    const handleGetPromotions = async () => {
        if (currentLocation != null) {
            const [la, lo] = currentLocation;
            latitude = la, longitude = lo;
            api.getRecommendPromotions(latitude, longitude, promotionPageNum).then(async (res) => {
                const newPromotions = res.promotions;
                setPromotions(prevPromotions => [...prevPromotions, ...newPromotions]);
                const noMore = res.noMore;
                if (noMore != true) {
                    setPromotionPageNum(prev => prev + 1);
                }
            })
        }
    }
    useEffect(() => {
        if (promotions.length == 0) {
            handleGetPromotions();
        }
    }, [currentLocation])
    return (
        <>
            <View style={tw`h-32`}>
                <ImageBackground style={tw`flex-1 h-full`} source={require('./bg.png')} resizeMode="cover">
                    <TopSearch keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
                </ImageBackground>
            </View>
            <PromotionArea onBottomRefresh={handleGetPromotions} promotions={promotions}></PromotionArea>
        </>
    )
}

export default Main;