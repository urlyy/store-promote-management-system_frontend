import { View, TextInput, Text, Pressable } from "react-native"
import tw from 'twrnc';
import { useEffect, useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import userStore from "../../stores/user";
// import localStorage from '../../utils/localStorage'

const AccountManage = () => {
    const navigation = useNavigation();
    const _logout = userStore(state => state.logout);
    const logout = () => {
        // localStorage.delete("user");
        _logout();
        // navigation.navigate("Entrance");
    }
    return (
        <View style={tw`flex-1`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>账号管理</Text>
            </View>
            <View style={tw`flex-1 p-1 items-center`}>
                <View style={tw`w-full gap-1`}>
                    <Pressable onPress={() => { navigation.navigate("UpdatePassword") }} style={tw`w-full bg-white p-1 rounded-md`}><Text style={tw`text-xl text-center text-black`}>修改密码</Text></Pressable>
                    <Pressable onPress={() => { navigation.navigate("EditProfile") }} style={tw`w-full bg-white p-1 rounded-md`}><Text style={tw`text-xl text-center text-black`}>编辑个人资料</Text></Pressable>
                </View>
                <Pressable onPress={logout} style={tw`mt-auto bg-white p-1 rounded-md w-full`}><Text style={tw`text-xl text-center text-black`}>登出</Text></Pressable>
            </View>
        </View>

    )
}
export default AccountManage