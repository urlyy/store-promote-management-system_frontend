import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import PromotionArea from '../../components/promotionArea/PromotionArea';
import { useState, useEffect } from 'react';
import TopSearch from '../../components/TopSearch';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import api from './api'


const SearchResult = ({ route }) => {
    const { keyword } = route.params;
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [category, setCategory] = useState(0);
    const [order, setOrder] = useState(0);
    const [promotions, setPromotions] = useState([]);
    const [categories, setCategories] = useState([
        { label: '项目', value: 0 },
        { label: '平台', value: 1 },
        { label: '软件', value: 2 }
    ]);
    const [orders, setOrders] = useState([
        { label: '最新', value: 0 },
        { label: '最热', value: 1 },
    ]);
    useEffect(() => {
        api.getRecommendPromotions().then(res => {
            setPromotions(res.promotions);
        })
    }, [])
    return (
        <View style={tw`flex-1`}>
            <TopSearch keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
            <View style={tw`pl-2 pr-2 flex-1`}>
                <Text style={tw`text-black bg-white text-xl border-b-[#f7f7f7] border-b-2`}>关键词:{keyword}</Text>
                <View style={tw`flex-row bg-white z-50`}>
                    {/* <View style={tw`flex-1 border-r-4 border-r-[#f7f7f7] z-100`}> */}
                    <View style={tw`flex-1`}>
                        <DropDownPicker
                            open={categoryModalOpen}
                            value={category}
                            items={categories}
                            setOpen={setCategoryModalOpen}
                            setValue={setCategory}
                            setItems={setCategories}

                            onChangeValue={(value) => {
                                console.log(value);
                            }}
                        />
                    </View>
                    <View style={tw`flex-1`}>
                        <DropDownPicker
                            open={orderModalOpen}
                            value={order}
                            items={orders}
                            setOpen={setOrderModalOpen}
                            setValue={setOrder}
                            setItems={setOrders}
                        />
                    </View>
                </View>
                <PromotionArea promotions={promotions}></PromotionArea>
            </View>
        </View>
    )
}
export default SearchResult;