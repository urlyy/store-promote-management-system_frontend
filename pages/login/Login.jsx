import { View, Text, TextInput, Pressable } from "react-native";
import tw from 'twrnc';
import { useState } from "react";

const FormInput = ({ value, onChange, placeholder = "" }) => {
    return (
        <TextInput
            style={tw`border text-xl`}
            onChangeText={text => onChange(text)}
            value={value}
            placeholder={placeholder}
        ></TextInput>
    )
}

const Entrance = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={tw`p-2 gap-2 justify-center`}>
            <Text style={tw`text-3xl text-black mx-auto`}>登录</Text>
            <FormInput onChange={setUsername} placeholder="输入用户名"></FormInput>
            <FormInput onChange={setPassword} placeholder="输入密码"></FormInput>
            <Pressable style={tw`border items-center p-1 bg-red-200`} onPress={() => navigation.navigate('Register')}>
                <Text style={tw`text-xl text-black`}>前往注册</Text>
            </Pressable>
            <Pressable style={tw`border items-center p-1 bg-blue-200`} onPress={() => navigation.navigate('Home')}>
                <Text style={tw`text-xl text-black`}>提交登录</Text>
            </Pressable>
        </View>
    )
}

export default Entrance;