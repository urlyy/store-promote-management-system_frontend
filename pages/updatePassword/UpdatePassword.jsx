import api from "./api";
import tw from 'twrnc'
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import userStore from "../../stores/user";
import localStorage from '../../utils/localStorage'
import { useState } from "react";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const _logout = userStore(state => state.logout);
    const submit = async () => {
        if (oldPassword == "" || newPassword == "") {
            return;
        }
        const res = await api.updatePassword(oldPassword, newPassword);
        if (res.success) {
            Alert.alert(
                '修改成功',
                res.message,
                [
                    {
                        text: '重新登录', onPress: () => {
                            localStorage.delete("user");
                            _logout();
                        }
                    }
                ],
                { cancelable: false }
            );

        } else {
            Alert.alert(
                '提示',
                res.message,
                [
                    { text: '确认', onPress: () => { } }
                ],
                { cancelable: false }
            );
        }
    }
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>修改密码</Text>
            </View>
            <View style={tw`flex-1 p-2 gap-1`}>
                <Text style={tw`text-xl text-black`}>旧密码</Text>
                <TextInput value={oldPassword} secureTextEntry={true} onChangeText={text => setOldPassword(text)} style={tw`border rounded-lg text-xl`} placeholder="输入旧密码"></TextInput>
                <Text style={tw`text-xl text-black`}>新密码</Text>
                <TextInput value={newPassword} onChangeText={text => setNewPassword(text)} secureTextEntry={true} style={tw`border rounded-lg text-xl`} placeholder="输入新密码"></TextInput>
                <Pressable onPress={submit} style={tw`rounded-lg border border-black mt-3 bg-green-500`}>
                    <Text style={tw`text-2xl text-center text-white p-2`}>提交修改</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default UpdatePassword;