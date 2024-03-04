import { Text, Image, View, ScrollView, Pressable } from 'react-native'
import tw from 'twrnc';
import { useState, useEffect } from 'react'
import api from './api'
import { useNavigation } from '@react-navigation/native';
import userStore from '../../stores/user';
import UserList from '../../components/userList/UserList';


const Follow = () => {
    const navigation = useNavigation();
    const { id } = userStore();
    const [data, setData] = useState([]);
    useEffect(() => {
        api.getFollowList(id).then((res) => {
            const users = res.users;
            setData(users.map(u => ({
                userId: u.userId,
                username: u.username,
                avatar: u.avatar,
                brief: u.brief,
                follow: u.follow,
            })))
        })
    }, []);
    const handleFollowChange = (idx, follow) => {
        const newData = JSON.parse(JSON.stringify(data))
        newData[idx].follow = follow;
        setData(newData);
    }
    return (
        <View style={tw`bg-white w-full`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>我的关注列表</Text>
            </View>
            <UserList users={data} onFollowChange={handleFollowChange}></UserList>
        </View>
    )
}
export default Follow;