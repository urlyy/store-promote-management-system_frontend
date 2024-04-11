import { Text, Image, View, ScrollView, ActivityIndicator, Pressable, Alert, Modal } from 'react-native'
import PromotionArea from '../../components/promotionArea/PromotionArea';
import { useState, useEffect } from 'react';
import TopSearch from '../../components/TopSearch';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import api from './api'
import userStore from '../../stores/user';
import Loading from '../../components/Loading';
import { merchantCategories } from '../../data';
import UserList from '../../components/userList/UserList';


const SearchResult = ({ route }) => {
    const { currentLocation } = userStore();
    const { keyword } = route.params;
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [promotionsPageNum, setPromotionsPageNum] = useState(1);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [category, setCategory] = useState('全部');
    const [order, setOrder] = useState(0);
    const [loading, setLoading] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState(merchantCategories.map(item => ({ label: item, value: item })));
    const [orders, setOrders] = useState([
        { label: '最匹配', value: 0 },
        { label: '最新', value: 1 },
    ]);
    const [searchType, setSearchType] = useState("推广");
    const [searchTypes, setSearchTypes] = useState([
        { label: "推广", value: "推广" },
        { label: "用户", value: "用户" },
    ])
    const [searchTypeModalOpen, setSearchTypeModalOpen] = useState(false);

    const handleGetPromotions = () => {
        const [latitude, longitude] = currentLocation;
        api.getRecommendPromotions(searchKeyword, category, promotionsPageNum, order, latitude, longitude).then(res => {
            const newPromotions = res.promotions || [];
            setPromotions(prev => [...prev, ...newPromotions]);
            const noMore = res.noMore;
            if (noMore != true) {
                setPromotionsPageNum(prev => prev + 1);
            }
            setLoading(false);
        })
    }

    const handleSearch = async () => {
        setLoading(true);
        if (searchType == "推广") {
            setPromotionsPageNum(1);
            const [latitude, longitude] = currentLocation;
            api.getRecommendPromotions(searchKeyword, category, 1, order, latitude, longitude).then(res => {
                const newPromotions = res.promotions;
                setPromotions([...newPromotions]);
                const noMore = res.noMore;
                if (noMore != true) {
                    setPromotionsPageNum(prev => prev + 1);
                }
                setLoading(false);
            })
        } else {
            api.getUsers(searchKeyword).then(res => {
                const us = res.users;
                setUsers(us.map(u => ({
                    userId: u.userId,
                    username: u.username,
                    avatar: u.avatar,
                    brief: u.brief,
                    follow: u.follow,
                })))
                setLoading(false);
            })
        }

    }
    const handleFollowChange = (idx, follow) => {
        const newData = JSON.parse(JSON.stringify(users))
        newData[idx].follow = follow;
        setUsers(newData);
    }
    useEffect(() => {
        handleSearch()
    }, [])
    return (
        <View style={tw`flex-1`}>
            <TopSearch onClick={handleSearch} keyword={searchKeyword} onChangeText={text => setSearchKeyword(text)}></TopSearch>
            <View style={tw`pl-2 pr-2 flex-1`}>
                <Text style={tw`text-black bg-white text-xl border-b-[#f7f7f7] border-b-2`}>关键词:{keyword}</Text>
                <View style={tw`flex-row bg-white z-50`}>
                    {/* <View style={tw`flex-1 border-r-4 border-r-[#f7f7f7] z-100`}> */}
                    <View style={tw`flex-1`}>
                        <DropDownPicker
                            open={searchTypeModalOpen}
                            setOpen={setSearchTypeModalOpen}
                            value={searchType}
                            items={searchTypes}
                            setValue={setSearchType}
                            setItems={setSearchTypes}
                            onChangeValue={(value) => {
                                console.log(value);
                            }}
                        />
                    </View>
                    {searchType == "推广" &&
                        (<>
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
                        </>)
                    }

                </View>
                <Loading visible={loading} />
                <View style={tw`bg-white flex-1`}>
                    {searchType == "推广" && promotions.length > 0 && <PromotionArea onBottomRefresh={handleGetPromotions} promotions={promotions}></PromotionArea>}
                    {searchType == "用户" && users.length > 0 && <UserList users={users} onFollowChange={handleFollowChange}></UserList>}
                    {(searchType == "用户" && users.length == 0) || (searchType == "推广" && promotions.length == 0) && (
                        <View style={tw`justify-center`}>
                            <Text style={tw`text-center font-bold text-2xl`}>未搜索到相关内容</Text>
                        </View>
                    )}
                </View>

            </View>
        </View>
    )
}
export default SearchResult;