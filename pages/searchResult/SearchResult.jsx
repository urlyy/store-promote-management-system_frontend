import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import PromotionItem from '../../components/PromotionItem';
import { useState, useEffect } from 'react';
import TopSearch from '../../components/TopSearch';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';

const SearchResult = ({ route }) => {
    const { keyword } = route.params;
    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [category, setCategory] = useState(0);
    const [order, setOrder] = useState(0);
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
        setData(promotionData)
    }, [])
    return (
        <View>
            <TopSearch keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
            <View style={tw`pl-2 pr-2`}>
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
                <ScrollView style={tw`pt-1`}>
                    <View style={tw`gap-2 bg-white`}>
                        {data.map((datum, idx) => <PromotionItem key={idx} data={datum}></PromotionItem>)}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default SearchResult;