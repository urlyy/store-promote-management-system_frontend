import { PermissionsAndroid, Modal, Alert, Text, Image, View, ScrollView, Pressable, TextInput, Button } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import api from './api'
import ImageGroup from '../../components/ImageGroup';


const Publish = ({ navigation, route }) => {
    const [images, setImages] = useState([]);
    const [text, setText] = useState("");
    const { promotionId } = route.params || { promotionId: null };
    const uploadPic = async () => {
        const options = {}
        const result = await launchImageLibrary(options);
        const file = {
            uri: result.assets[0].uri,
            type: `multipart/form-data`,
            name: `image.png`
        }
        const { file: url } = await api.uploadPromotion(file);
        setImages([...images, url]);
    }
    const submit = async () => {
        if (text == "") {
            return;
        }
        let res;
        if (promotionId == null) {
            res = await api.createPromotion(text, images);
        } else {
            res = await api.editPromotion(promotionId, text, images);
        }
        if (res.success == true) {
            Alert.alert(
                '成功提示',
                '上传成功，即将跳转到主界面',
                [
                    { text: '确定', onPress: () => { navigation.navigate("Home"); } },
                ],
                { cancelable: false }
            );
        } else {
        }
    }
    //左闭右闭
    const range = (start, end) => {
        const res = Array.from({ length: end - start + 1 }, (_, index) => start + index);
        return res;
    }
    useEffect(() => {

        if (promotionId) {
            api.getPromotion(promotionId).then(res => {
                const pro = res.promotion;
                setText(pro.text);
                setImages(pro.imgs);
            })
        }
    }, [])
    return (
        <ScrollView>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>发布</Text>
            </View>
            <View style={tw`p-1 gap-2`}>
                <Text style={tw`text-xl`}>请输入文案</Text>
                <TextInput onChangeText={text => setText(text)} value={text} multiline={true} style={tw`border rounded-sm text-xl`}></TextInput>
                <Text style={tw`text-xl`}>请选择图片</Text>
                <ImageGroup allowDelete={true} onDelete={(targetIdx) => { setImages(images.filter((img, idx) => idx != targetIdx)) }} imgs={images}></ImageGroup>
                <Pressable onPress={uploadPic} style={tw`h-20 w-20 bg-slate-300 justify-center items-center`}>
                    <Text style={tw`text-2xl`}>+</Text>
                </Pressable>
                <Pressable onPress={submit} style={tw`p-1 items-center justify-center border border-black rounded-lg bg-yellow-400`}>
                    <Text style={tw`text-xl text-black`}>提交</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
export default Publish;