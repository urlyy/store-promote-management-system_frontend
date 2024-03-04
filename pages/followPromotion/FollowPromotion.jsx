import tw from 'twrnc'
import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import api from './api'
import PromotionArea from '../../components/promotionArea/PromotionArea'

const FollowPromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [promotionsPageNum, setPromotionsPageNum] = useState(1);

    const handleGetPromotions = () => {
        api.getPromotionsFromFollow(promotionsPageNum).then((res) => {
            const newPromotions = res.promotions;
            setPromotions(prevPromotions => [...prevPromotions, ...newPromotions]);
            const noMore = res.noMore;
            if (noMore != true) {
                setPromotionsPageNum(prev => prev + 1);
            }
        })
    }

    useEffect(() => {
        handleGetPromotions();
    }, [])


    return (
        <>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>我的关注</Text>
            </View>
            <PromotionArea onBottomRefresh={handleGetPromotions} promotions={promotions}></PromotionArea>
        </>

    )
}

export default FollowPromotion;