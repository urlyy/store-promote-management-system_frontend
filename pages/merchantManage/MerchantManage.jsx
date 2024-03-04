import { View, Text, Image, ScrollView, Pressable, Alert } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import api from './api'
import userStore from '../../stores/user';
import dateFormat from '../../utils/dateFormat';
import PromotionArea from '../../components/promotionArea/PromotionArea';
import ImageGroup from '../../components/ImageGroup';
import { merchantCategories } from '../../data'
import DropDownPicker from 'react-native-dropdown-picker';
import locator from '../../utils/getLocation';

const MerchantManage = () => {
    const [promotions, setPromotions] = useState([]);
    const navigation = useNavigation();
    const { id, category: myCategory, location } = userStore();
    const setMyCategory = userStore(state => state.setCategory);
    const [curAddress, setCurAddress] = useState(null);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState(merchantCategories.map(item => ({ label: item, value: item })));
    const [category, setCategory] = useState(myCategory);
    useEffect(() => {
        const [latitude, longitude] = location;
        console.log(location);
        locator.getCityByLocation(latitude, longitude).then(addr => {
            setCurAddress(addr);
        })
        api.getPromotions(id).then((res) => {
            const p = res.promotions;
            setPromotions(p.map(item => ({
                id: item.id,
                merchantId: item.merchantId,
                createTime: item.createTime,
                imgs: item.imgs,
                isTop: item.isTop,
                commentNum: item.commentNum,
                likeNum: item.likeNum,
                text: item.text,
            })));
        });
    }, [])
    const handleDelete = (idx) => {
        Alert.alert(
            '操作确认',
            '确定删除该推广吗?',
            [
                { text: '取消', onPress: () => { } },
                {
                    text: '确认', onPress: async () => {
                        const res = await api.deletePromotion(promotions[idx].id);
                        if (res.success) {
                            setPromotions(promotions.filter((item, i) => i != idx));
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    }
    const handleEdit = (idx) => {
        console.log(promotions[idx].id)
        navigation.navigate("Publish", { promotionId: promotions[idx].id });
    }
    const handleChangeCategory = async (newCategory) => {
        const res = await api.changeCategory(newCategory);
        if (res.success == true) {
            setMyCategory(newCategory);
        }
    }
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>店铺管理</Text>
            </View>
            <View style={tw`p-1 gap-2`}>
                <View style={tw`flex-row items-center gap-2`}>
                    <Pressable style={tw`p-1 border-2 border-gray-300 rounded-md`} onPress={() => { navigation.navigate('MerchantPosition') }}>
                        <Text style={tw`text-black text-2xl text-center`}>店铺定位</Text>
                    </Pressable>
                    <Text numberOfLines={2} style={tw`text-black text-xl flex-1`}>{curAddress && curAddress}</Text>
                </View>
                <View style={tw`p-1 w-full border-2 border-gray-300 rounded-md bg-white h-14 z-50 flex-row gap-2 items-center`}>
                    <Text style={tw`text-xl text-black`}>设置店铺类型</Text>
                    <View style={tw`flex-1`}>
                        <DropDownPicker
                            open={categoryModalOpen}
                            value={category}
                            items={categories}
                            setOpen={setCategoryModalOpen}
                            setValue={setCategory}
                            setItems={setCategories}
                            onChangeValue={(value) => {
                                handleChangeCategory(value);
                            }}
                            style={tw`min-h-full`}
                            textStyle={tw`text-lg`}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Text style={tw`text-black text-2xl border-b-4 border-b-[#f7f7f7] p-1`}>推广管理</Text>
                <ScrollView>
                    {promotions.length == 0 ? (<View style={tw` items-center w-full`}><Text style={tw`flex text-black text-2xl`}>暂无推广</Text></View>) :
                        (
                            promotions.map((item, idx) => (
                                <View key={idx} style={tw`p-2 flex-row min-h-44 gap-1 rounded-sm border-b-[#f7f7f7] border-b-4 `}>
                                    <View style={tw`flex-1 gap-1 justify-between`}>
                                        <Pressable onPress={() => { navigation.navigate('PromotionDetail', { promotionId: item.id, merchantId: id }) }}>
                                            <Text numberOfLines={3} style={tw`text-black text-lg`}>{item.text}</Text>
                                        </Pressable>
                                        <ImageGroup imgs={item.imgs} onlyOneRow={true}></ImageGroup>
                                        <View style={tw`flex-row`}>
                                            <View>
                                                <Text>{item.likeNum}人点赞</Text>
                                                <Text>发布于{item.createTime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={tw`justify-between items-end`}>
                                        <Pressable onPress={handleEdit.bind(null, idx)}><Text style={tw`text-lg`}>编辑</Text></Pressable>
                                        {/* <Pressable onPress={handleEdit.bind(null, idx)}><Text style={tw`text-lg`}>申请置顶</Text></Pressable> */}
                                        <Pressable onPress={handleDelete.bind(null, idx)}><Text style={tw`text-lg`}>删除</Text></Pressable>
                                    </View>
                                </View>
                            ))
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}
export default MerchantManage;