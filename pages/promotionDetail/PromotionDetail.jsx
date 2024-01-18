import { View, Image, Text, Modal, TextInput, StyleSheet, Pressable, ScrollView } from "react-native"
import tw from 'twrnc';
import { Col, Row, Grid } from "react-native-easy-grid";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import api from './api'
import dateFormat from "../../utils/dateFormat";

const Comment = ({ comment, navigation }) => {
    const [user, setUser] = useState({ id: comment.userId });
    useEffect(() => {
        api.getUser(comment.userId).then(res => {
            const user = res.user;
            setUser(user);
        })
    }, [])
    return (
        <View style={tw`flex-row pl-2 pr-2 pt-2 gap-1 w-full`}>
            <Pressable style={tw`w-14 h-14`} onPress={() => { navigation.navigate('Profile', { userId: user.id }) }}>
                {user.avatar && <Image style={tw`w-full h-full rounded-full`} source={{ uri: user.avatar }}></Image>}
            </Pressable>
            <View style={tw`flex-1 border-b-2 border-b-[#f7f7f7] justify-around`}>
                <View style={tw`flex-row`}>
                    <Text style={tw`text-lg text-yellow-600`}>{user.username}</Text>
                    <Text style={tw`ml-auto text-lg`}>{dateFormat(comment.createTime)}</Text>
                </View>
                <View><Text style={tw`text-lg`}>{comment.text}</Text></View>
            </View>
        </View>
    )
}

const PromotionDetail = ({ route }) => {
    const { promotionId, merchantId } = route.params;
    const [merchant, setMerchant] = useState({});
    const [promotion, setPromotion] = useState({});
    const [comments, setComments] = useState([]);
    const [textInputActive, setTextInputActive] = useState(false);
    const [commentInput, setCommentInput] = useState("")
    const navigation = useNavigation();
    const [modalImage, _setModalImage] = useState({ img: [], index: [] });
    useEffect(() => {
        api.getPromotion(promotionId).then(res => {
            const promotion = res.promotion;
            setPromotion(promotion);
        })
        api.getUser(merchantId).then(res => {
            const user = res.user;
            setMerchant(user);
        })
        api.getComments(promotionId).then(res => {
            const resComments = res.comments;
            const comments = resComments.map(item => ({
                id: item.id,
                createTime: item.create_time,
                text: item.text,
                userId: item.user_id,
            }))
            setComments(comments)
        })
    }, []);
    const setAllModalImage = (index) => {
        _setModalImage({ img: promotion.imgs.map(img => ({ url: img })), index: index });
    };
    const clearModalImage = () => {
        _setModalImage({ img: [], index: 0 });
    };
    //左闭右闭
    const range = (start, end) => {
        const res = Array.from({ length: end - start + 1 }, (_, index) => start + index);
        return res;
    }
    const sendComment = async () => {
        if (commentInput == "") {
            return;
        }
        const text = commentInput;
        setCommentInput("");
        setTextInputActive(false);
        const res = await api.sendComment(text, promotion.id);
        const comment = {
            id: res.comment.id,
            createTime: res.comment.create_time,
            text: res.comment.text,
            userId: res.comment.user_id,
        };
        setComments([...comments, comment])
    }
    return (
        <ScrollView>
            <View style={tw`w-full items-center bg-yellow-500 pb-2 pt-2 flex-row`}>
                <Text style={tw`font-bold text-3xl text-white mx-auto`}>详情</Text>
            </View>
            <Modal visible={modalImage.img.length != 0}>
                <ImageViewer index={modalImage.index} imageUrls={modalImage.img} onClick={() => { clearModalImage(); }} />
            </Modal>
            <View style={tw` flex-1 gap-1 rounded-sm p-1 border-b-[#f7f7f7] border-b-4`}>
                <View style={tw`flex-row gap-1 bg-white`}>
                    <Pressable style={tw`w-20 h-20`} onPress={() => { navigation.navigate('Profile', { userId: merchant.id }) }}>
                        {merchant.avatar && <Image style={tw`w-full h-full rounded-md`} source={{ uri: merchant.avatar }}></Image>}
                    </Pressable>
                    <View style={tw`justify-around`}>
                        <Text style={tw`text-2xl text-black`}>{merchant.username}</Text>
                        <Text style={tw`text-lg`}>{merchant.brief}</Text>
                    </View>
                </View>
                <View style={tw`flex-1 gap-1`}>
                    {promotion.isTop && <Text style={tw`text-lg text-white bg-red-500`}>置顶</Text>}
                    <Text style={tw`text-xl bg-white p-1`}>{promotion.text}</Text>
                    <View style={tw` bg-white`}>
                        {promotion.imgs && promotion.imgs.length > 0 && range(0, Math.ceil(promotion.imgs.length / 3) - 1).map((_, rowIdx) =>
                        (
                            <View key={rowIdx} style={tw`w-full flex-row `}>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 < promotion.imgs.length && <Pressable onPress={() => setAllModalImage(rowIdx * 3)}>
                                        <Image style={tw`w-full aspect-square border border-slate-400`} source={{ uri: promotion.imgs[rowIdx * 3] }}></Image>
                                    </Pressable>}
                                </View>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 + 1 < promotion.imgs.length && <Pressable onPress={() => setAllModalImage(rowIdx * 3 + 1)}>
                                        <Image style={tw`w-full aspect-square border border-slate-400`} source={{ uri: promotion.imgs[rowIdx * 3 + 1] }}></Image>
                                    </Pressable>}
                                </View>
                                <View style={tw`flex-1`}>
                                    {rowIdx * 3 + 2 < promotion.imgs.length && <Pressable onPress={() => setAllModalImage(rowIdx * 3 + 2)}>
                                        <Image style={tw`w-full aspect-square border border-slate-400`} source={{ uri: promotion.imgs[rowIdx * 3 + 2] }}></Image>
                                    </Pressable>}
                                </View>
                            </View>
                        )
                        )}
                    </View>
                    <View style={tw`flex-row bg-white`}>
                        <View>
                            <Text style={tw`text-lg`}>{promotion.uv}人浏览,{promotion.like}人点赞</Text>
                            <Text style={tw`text-lg`}>发布于{promotion.create_time}</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white`}>
                        <View style={tw`flex-row border-b-2 border-b-[#f7f7f7]`}>
                            <Text style={tw`text-2xl text-black`}>全部评论</Text>
                            {!textInputActive && <Pressable onPress={setTextInputActive.bind(null, true)} style={tw`ml-auto`}>
                                <Text style={tw` text-xl`}>发送评论</Text>
                            </Pressable>}
                            {textInputActive && <Pressable onPress={setTextInputActive.bind(null, false)} style={tw`ml-auto`}>
                                <Text style={tw`text-black text-xl`}>关闭评论</Text>
                            </Pressable>}
                        </View>
                        {textInputActive && <View style={tw`flex-row`}>
                            <TextInput onChangeText={text => setCommentInput(text)} value={commentInput} style={tw`border-l border-b border-t border-black rounded-l-lg min-h-1 flex-1`} multiline={true}></TextInput>
                            <Pressable onPress={sendComment} style={tw`p-1 justify-center border-t border-r border-b border-black rounded-r-lg`}>
                                <Text style={tw`text-black`}>发送</Text>
                            </Pressable>
                        </View>}
                        <View>
                            {comments.length == 0 ? <Text style={tw`text-center text-xl`}>暂无评论</Text> : comments.map((comment, idx) => (
                                <Comment comment={comment} navigation={navigation} key={idx}></Comment>
                            ))}
                        </View>
                    </View>
                </View>
            </View >
        </ScrollView>

    )
}


export default PromotionDetail;