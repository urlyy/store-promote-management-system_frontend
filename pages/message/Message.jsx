import { View, Image, Text, Pressable, ScrollView } from "react-native"
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { TextInput } from "react-native-gesture-handler";
const MessageItem = ({ data, alignLeft }) => {
    return (
        <View style={tw`${alignLeft ? "flex-row" : "flex-row-reverse"} mt-2 gap-2 items-center `}>
            <Image style={tw`rounded-full w-15 h-15`} source={require('./avatar.jpg')}></Image>
            {data.text != "" && <Text style={tw`text-xl bg-white rounded-xl p-1`}> {data.text}</Text>}
            {data.text == "" && data.image != "" && <Image source={require('./avatar.jpg')}></Image>}
        </View >
    )
}


const Message = ({ route }) => {
    // const { merchantId } = route.merchantId;
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const datum = {
            avatar: "",
            text: "123412341234",
            image: "",
            userId: 1,
        }
        const datum1 = {
            avatar: "",
            text: "哈哈哈哈",
            image: "",
            userId: 2,
        }
        const datum2 = {
            avatar: "",
            text: "",
            image: "12341234",
            userId: 2,
        }
        setMessages([datum, datum1, datum2])
    }, [])
    return (
        <View style={tw`flex-1`}>
            <View style={tw`w-full bg-white justify-center pb-2 pt-2 flex-row items-center`}>
                <Pressable onPress={() => navigation.navigate("Profile")} style={tw`absolute left-0`}>
                    <Text style={tw`text-2xl pl-1`}>{"<"}返回</Text>
                </Pressable>
                <Text style={tw`text-3xl text-black mx-auto`}>美食记</Text>
                <Pressable style={tw`absolute right-0`}>
                    <Text style={tw`text-2xl pr-1`}>刷新</Text>
                </Pressable>
            </View>
            <View style={tw`flex-1  w-full`}>
                {messages.map((item, idx) => {
                    return (<MessageItem key={idx} alignLeft={item.userId == 1} data={item}></MessageItem>)
                })}
            </View>
            <View style={tw`bg-white p-2 flex-row min-h-3 gap-1`}>
                <TextInput multiline={true} style={tw.style(`text-xl flex-1 border h-full border-black rounded-l-lg rounded-r-lg`, { textAlignVertical: 'top' })}></TextInput>
                <Pressable style={tw`bg-green-500 rounded-xl p-1 w-20 flex items-center justify-center`}>
                    <Text style={tw`text-xl text-white`}>发送</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default Message;