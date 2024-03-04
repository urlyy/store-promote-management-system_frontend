import tw from 'twrnc'
import { View, ScrollView, Text, Pressable, Image } from 'react-native';
import api from './api';
import { useNavigation } from '@react-navigation/native';


const UserList = ({ users, onFollowChange = (idx, follow) }) => {
    const navigation = useNavigation();
    const follow = async (idx) => {
        const user = users[idx];
        const res = await api.follow(user.userId);
        if (res.success == true) {
            onFollowChange(idx, true)
        }
    }
    const followCancel = async (idx) => {
        const user = users[idx];
        const res = await api.followCancel(user.userId)
        if (res.success == true) {
            onFollowChange(idx, false);
        }
    }
    return (
        <ScrollView style={tw``}>
            {users.length == 0 ?
                (<View style={tw` items-center w-full`}><Text style={tw`flex text-black text-2xl`}>暂无</Text></View>) :
                (
                    users.map((datum, idx) => (
                        <View key={idx} style={tw`p-2 flex-row gap-1 border-b-[#f7f7f7] border-b-4`}>
                            <Pressable style={tw`w-16 h-16`} onPress={() => navigation.navigate("Profile", { userId: datum.userId })}>
                                {datum.avatar && <Image style={tw`w-full h-full rounded-full`} source={{ uri: datum.avatar }}></Image>}
                            </Pressable>
                            <View style={tw`flex-1 items-center flex-row`}>
                                <View style={tw`justify-around`}>
                                    <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                    <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                </View>
                                {/* <View style={tw`items-center`}>
                                        <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                        <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                    </View> */}
                                <View style={tw`ml-auto `}>
                                    {datum.follow ?
                                        (<Pressable style={tw`p-1 bg-white border border-black rounded-2xl`} onPress={() => { followCancel(idx) }}><Text style={tw`text-2xl text-black`}>取消关注</Text></Pressable>) :
                                        (<Pressable style={tw`p-1 bg-yellow-400 rounded-2xl`} onPress={() => { follow(idx) }}><Text style={tw`text-2xl text-black`}>关注</Text></Pressable>)
                                    }
                                </View>
                            </View>
                        </View>
                    ))
                )
            }
        </ScrollView>
    )
}

export default UserList;