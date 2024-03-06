import { View, Image, Text, TextInput, Pressable, Modal, Alert } from "react-native"
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import api from './api'
import userStore from '../../stores/user'
// import localStorage from '../../utils/localStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../../components/Loading";

const Login = ({ onChangeRoute }) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const setUser = userStore(state => state.setUser);
    const submit = async () => {
        if (username == "" || pass == "") {
            Alert.alert(
                '提示',
                '用户名和密码不能为空',
                [
                    {
                        text: '确定', onPress: () => { }
                    }
                ],
                { cancelable: false }
            );
            return;
        }
        const res = await api.login(username, pass);
        // return;
        if (res.success) {
            const user = res.data.user;
            const token = res.data.token;
            user.token = token;
            AsyncStorage.setItem('token', token);
            // localStorage.set("user", JSON.stringify(user));
            setUser(user);
        } else {
            Alert.alert(
                '提示',
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
    return (
        <View style={tw`flex-1 p-2 gap-1`}>
            <Text style={tw`text-xl text-black`}>输入用户名</Text>
            <TextInput value={username} onChangeText={text => setUsername(text)} style={tw`border rounded-lg text-xl`} placeholder=""></TextInput>
            <Text style={tw`text-xl text-black`}>输入密码</Text>
            <TextInput value={pass} onChangeText={text => setPass(text)} secureTextEntry={true} style={tw`border rounded-lg text-xl`} placeholder=""></TextInput>
            <Pressable onPress={submit} style={tw`rounded-lg border border-black mt-3 bg-green-500`}>
                <Text style={tw`text-2xl text-center text-white p-2`}>登录</Text>
            </Pressable>
            <Pressable onPress={() => { onChangeRoute("register") }} style={tw`items-start mt-3`}>
                <Text style={tw`p-2 text-xl text-white bg-gray-400 rounded-lg border border-black`}>前往注册</Text>
            </Pressable>
        </View>
    )
}

const Register = ({ onChangeRoute }) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        if (username == "" || pass == "" || gender == null) {
            Alert.alert(
                '提示',
                '信息不能为空',
                [
                    {
                        text: '确定', onPress: () => { }
                    }
                ],
                { cancelable: false }
            );
            return;
        } else {
            setLoading(true);
            const res = await api.register(username, pass, gender);
            if (res.success) {
                setUsername("");
                setPass("");
                setGender(null);
                setLoading(false);
                Alert.alert(
                    '注册成功',
                    '请登录',
                    [
                        {
                            text: '前往登录', onPress: () => {
                                onChangeRoute("login")
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                setLoading(false);
                Alert.alert(
                    '注册失败',
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
    return (
        <View style={tw`flex-1 p-2 gap-1`}>
            <Loading visible={loading} />
            <Text style={tw`text-xl text-black`}>输入用户名</Text>
            <TextInput value={username} onChangeText={text => setUsername(text)} style={tw`border rounded-lg text-xl`} placeholder=""></TextInput>
            <Text style={tw`text-xl text-black`}>输入密码</Text>
            <TextInput value={pass} onChangeText={text => setPass(text)} secureTextEntry={true} style={tw`border rounded-lg text-xl`} placeholder=""></TextInput>
            <Text style={tw`text-xl text-black`}>确认性别</Text>
            <View style={tw`flex-row justify-around gap-3`}>
                <Pressable onPress={setGender.bind(null, false)} style={tw`${gender == false ? 'bg-blue-300' : ""} border border-black rounded-md flex-1 p-2`}>
                    <Text style={tw`${gender == false ? 'text-white' : "text-black"} text-center text-lg  font-bold`}>男</Text>
                </Pressable>
                <Pressable onPress={setGender.bind(null, true)} style={tw`${gender == true ? 'bg-red-300' : ""}  border border-black rounded-md flex-1 p-2`}>
                    <Text style={tw`${gender == true ? 'text-white' : "text-black"} text-center text-lg  font-bold`}>女</Text>
                </Pressable>
            </View>
            <Pressable onPress={submit} style={tw`rounded-lg border border-black mt-3 bg-green-500`}>
                <Text style={tw`text-2xl text-center text-white p-2`}>提交注册信息</Text>
            </Pressable>
            <Pressable onPress={() => { onChangeRoute("login") }} style={tw`items-start mt-3`}>
                <Text style={tw`p-2 text-xl text-white bg-gray-400 rounded-lg border border-black`}>前往登录</Text>
            </Pressable>
        </View>
    )
}



const Entrance = ({ }) => {
    // const navigation = useNavigation();
    const navigation = "";
    const [pageName, setPageName] = useState("login");
    const pageTitle = () => {
        if (pageName == "login") {
            return "登录";
        } else if (pageName == "register") {
            return "注册";
        }
    }
    return (
        <Modal visible={true}>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>{pageTitle()}</Text>
            </View>
            {pageName == "login" && <Login onChangeRoute={setPageName} navigation={navigation}></Login>}
            {pageName == "register" && <Register onChangeRoute={setPageName} navigation={navigation}></Register>}
        </Modal>
    )
}

export default Entrance;