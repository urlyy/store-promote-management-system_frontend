import { View, Text, Image, ScrollView, Pressable, Alert } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import api from './api'
import userStore from '../../stores/user';
import dateFormat from '../../utils/dateFormat';
import PromotionArea from '../../components/promotionArea/PromotionArea';
import ImageGroup from '../../components/ImageGroup';

const PromotionManage = () => {
    const [promotions, setPromotions] = useState([]);
    const { id } = userStore();
    useEffect(() => {
        api.getPromotions(id).then((res) => {
            const p = res.promotions;
            setPromotions(p);
        })
    })
    const handleDelete = (idx) => {
        Alert.alert(
            '操作确认',
            '确定删除该推广吗?',
            [
                { text: '取消', onPress: () => { } },
                { text: '确认', onPress: () => { } },
            ],
            { cancelable: false }
        );
    }
    const handleEdit = (idx) => {

    }
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>推广管理</Text>
            </View>
            <View>
                {promotions.map((item, idx) => (
                    <View style={tw`flex-row gap-1 rounded-sm p-2 border-b-[#f7f7f7] border-b-4 `}>
                        <View style={tw`flex-1 gap-1`}>
                            <Pressable onPress={() => { navigation.navigate('PromotionDetail', { promotionId: item.id, merchantId: id }) }}>
                                <Text numberOfLines={3} style={tw`text-black text-lg`}>{item.text}</Text>
                            </Pressable>
                            <ImageGroup imgs={item.imgs} onlyOneRow={true}></ImageGroup>
                            <View style={tw`flex-row`}>
                                <View>
                                    <Text>{item.uv}人浏览,{item.like}人点赞</Text>
                                    <Text>发布于{item.create_time}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw`justify-between`}>
                            <Pressable onPress={handleEdit.bind(null, idx)}><Text style={tw`text-lg`}>编辑</Text></Pressable>
                            <Pressable onPress={handleDelete.bind(null, idx)}><Text style={tw`text-lg`}>删除</Text></Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}
export default PromotionManage;