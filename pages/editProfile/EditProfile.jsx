import api from "./api";
import tw from 'twrnc'
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import userStore from "../../stores/user";
import localStorage from '../../utils/localStorage'
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const EditProfile = () => {
    const { username: uname, age: uage, brief: ubrief, gender: ugender } = userStore();
    const [username, setUsername] = useState(uname);
    const [brief, setBrief] = useState(ubrief);
    const [age, setAge] = useState(uage);
    const [gender, setGender] = useState(ugender);
    const navigation = useNavigation();
    const setUser = userStore(state => state.setUser);
    const submit = async () => {
        if (username == "" || brief == "") {
            return;
        }
        if (username == uname && age == uage && gender == ugender && ubrief == brief) {
            Alert.alert(
                '提示',
                "修改成功",
                [
                    {
                        text: '确定', onPress: () => {
                            navigation.navigate("Mine");
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            const res = await api.updateProfile(username, brief, age, gender);
            if (res.success) {
                Alert.alert(
                    '提示',
                    '修改成功',
                    [
                        {
                            text: '确定', onPress: () => {
                                const preUser = JSON.parse(localStorage.getString("user"));
                                preUser.username = username;
                                preUser.age = age;
                                preUser.gender = gender;
                                preUser.brief = brief;
                                localStorage.set("user", JSON.stringify(preUser));
                                setUser(preUser);

                                navigation.navigate("Mine");
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    '修改失败',
                    res.message,
                    [
                        {
                            text: '确定', onPress: () => { }
                        }
                    ],
                    { cancelable: false }
                );
            }
        }
    }
    const handleReset = () => {
        setUsername(uname);
        setAge(uage);
        setBrief(ubrief);
        setGender(ugender);
    }
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>修改个人资料</Text>
            </View>
            <View style={tw`flex-1 p-2 gap-1`}>
                <Text style={tw`text-xl text-black`}>新用户名</Text>
                <TextInput value={username} onChangeText={text => setUsername(text)} style={tw`border rounded-lg text-xl`} placeholder="输入新用户名"></TextInput>
                <Text style={tw`text-xl text-black`}>新简介</Text>
                <TextInput value={brief} multiline={true} onChangeText={text => setBrief(text)} secureTextEntry={true} style={tw`border rounded-lg text-xl`} placeholder="输入新简介"></TextInput>
                <Text style={tw`text-xl text-black`}>性别</Text>
                <View style={tw`flex-row justify-around gap-3`}>
                    <Pressable onPress={setGender.bind(null, false)} style={tw`${gender == false ? 'bg-blue-300' : ""} border border-black rounded-md flex-1 p-2`}>
                        <Text style={tw`${gender == false ? 'text-white' : "text-black"} text-center text-lg  font-bold`}>男</Text>
                    </Pressable>
                    <Pressable onPress={setGender.bind(null, true)} style={tw`${gender == true ? 'bg-red-300' : ""}  border border-black rounded-md flex-1 p-2`}>
                        <Text style={tw`${gender == true ? 'text-white' : "text-black"} text-center text-lg  font-bold`}>女</Text>
                    </Pressable>
                </View>
                <Text style={tw`text-xl text-black`}>年龄</Text>
                <View style={tw`border border-black rounded-md`}>
                    <Picker
                        selectedValue={age}
                        onValueChange={(itemValue) => setAge(itemValue)}
                    >
                        {[...Array(149).keys()].map(item => (
                            <Picker.Item key={item} label={item + 1} value={item + 1} />
                        ))}
                    </Picker>
                </View>
                <View style={tw`flex-row gap-2`}>
                    <Pressable onPress={submit} style={tw`flex-1 rounded-lg border border-black mt-3 bg-green-500`}>
                        <Text style={tw`text-2xl text-center text-white p-2`}>提交修改</Text>
                    </Pressable>
                    <Pressable onPress={handleReset} style={tw`flex-1 rounded-lg border border-black mt-3 bg-red-500`}>
                        <Text style={tw`text-2xl text-center text-white p-2`}>重置</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default EditProfile;