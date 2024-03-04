import { View, Image, Text, Pressable, ScrollView, Alert, Modal } from "react-native"
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { TextInput } from "react-native-gesture-handler";
import api from './api'
import userStore from "../../stores/user";
import dateFormat from "../../utils/dateFormat";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Loading from "../../components/Loading";

const MessageItem = ({ msg, sender, alignLeft, onPressImg }) => {
    const [width, setWidth] = useState(0);
    const height = 100;
    useEffect(() => {
        if (msg.img) {
            Image.getSize(msg.img,
                (w, h) => {
                    setWidth(height * (w / h))
                },
                (failure) => { console.log('failure', failure) }
            )
        }

    }, [msg])
    return (
        <>
            <View style={tw`items-center`}>
                <Text>{dateFormat(msg.createTime)}</Text>
            </View>
            <View style={tw`${alignLeft ? "flex-row" : "flex-row-reverse"} gap-2`}>
                <Image style={tw`rounded-full w-15 h-15`} source={{ uri: sender.avatar }}></Image>
                <View style={tw`flex-1 ${alignLeft ? "items-start" : "items-end"}`}>
                    {msg.text != "" && <Text style={tw`text-xl bg-white rounded-lg p-1 max-w-full`}> {msg.text}</Text>}
                    {msg.text == "" && msg && msg.img != "" && (
                        <Pressable onPress={() => onPressImg(msg.img)} style={tw`w-[${width}px] h-[${height}px]`}>
                            <Image style={tw`w-full h-full`} source={{ uri: msg.img }}></Image>
                        </Pressable>)}
                </View>
            </View >
        </>
    )
}


const PrivateMessage = ({ route }) => {
    const { userId } = route.params;
    const { username, avatar, brief, id, role } = userStore();
    const [thisGuy, setThisGuy] = useState({});
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [modalImage, _setModalImage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleGetMessages = () => {
        setLoading(true);
        api.getMessages(userId).then(res => {
            const msgs = res.msgs;
            setMessages(msgs);
            setLoading(false);
        })
    }
    useEffect(() => {
        api.getUser(userId).then(res => {
            const guy = res.user;
            setThisGuy(guy);
            handleGetMessages();
        })
    }, [])
    const setModalImage = (img) => {
        _setModalImage(img);
    };
    const clearModalImage = () => {
        _setModalImage("");
    }
    const getMe = () => {
        return {
            id: id,
            avatar: avatar,
            username: username,
        }
    }
    const handleSendText = async () => {
        if (text == "") { return }
        setText("");
        const res = await api.sendText(userId, text);
        const msg = res.msg;
        setMessages([...messages, msg]);
    }
    const sendImg = async (userId, uri) => {
        const img = {
            uri: uri,
            type: `multipart/form-data`,
            name: `image.png`,
        }
        const res = await api.sendImage(userId, img);
        const msg = res.msg;
        console.log(msg);
        setMessages([...messages, msg]);
    }
    const handleSelectAndSendImg = async () => {
        const options = {}
        const result = await launchImageLibrary(options);
        const uri = result.assets[0].uri;
        Alert.alert(
            '发送图片操作确认',
            '确定发送这张图片吗?',
            [
                { text: '取消', onPress: () => { } },
                { text: '确认', onPress: () => { sendImg(userId, uri) } },
            ],
            { cancelable: false }
        );
    }
    return (
        <View style={tw`w-100 h-full`}>
            <Loading visible={loading} />
            <View style={tw`w-full bg-white justify-center pb-2 pt-2 flex-row items-center`}>
                <Pressable onPress={() => navigation.navigate("Profile", { userId: userId })} style={tw`absolute left-0`}>
                    <Text style={tw`text-2xl pl-1`}>{"<"}返回</Text>
                </Pressable>
                <Text style={tw`text-3xl text-black mx-auto`}>{thisGuy.username}</Text>
                <Pressable onPress={handleGetMessages} style={tw`absolute right-0`}>
                    <Text style={tw`text-2xl pr-1`}>刷新</Text>
                </Pressable>
            </View>
            <Modal visible={modalImage != ""}>
                <ImageViewer imageUrls={[{ url: modalImage }]} onClick={() => { clearModalImage(); }} />
            </Modal>
            <ScrollView style={tw`flex-1 p-2`}>
                {messages.map((item, idx) => {
                    return (<MessageItem onPressImg={setModalImage} key={idx} alignLeft={item.senderId != id} msg={item} sender={item.senderId == id ? getMe() : thisGuy}></MessageItem>)
                })}
            </ScrollView>
            <View style={tw`bg-white p-2 flex-row gap-1 items-end min-h-1`}>
                <TextInput value={text} onChangeText={text => setText(text)} multiline={true} style={tw.style(`text-xl flex-1 border h-full border-black rounded-l-lg rounded-r-lg`, { textAlignVertical: 'top' })}></TextInput>
                <Pressable onPress={handleSendText} style={tw`bg-green-500 rounded-lg p-1 w-12 flex items-center justify-center`}>
                    <Text style={tw`text-xl text-white`}>发送</Text>
                </Pressable>
                <Pressable onPress={handleSelectAndSendImg} style={tw`bg-sky-500 rounded-lg p-1 w-12 flex items-center justify-center`}>
                    <Text style={tw`text-xl text-white`}>图片</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default PrivateMessage;