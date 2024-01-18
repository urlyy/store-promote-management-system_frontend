import { View, Image, Text, TextInput, StyleSheet, Modal, Pressable, ScrollView } from "react-native"
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from "react";
import ImageViewer from 'react-native-image-zoom-viewer';
import api from './api'
import ImageGroup from "../ImageGroup";
import { CommentIcon } from "../Icons";


const Comment = ({ comment }) => {
    const [user, setUser] = useState({ id: comment.userId });
    useEffect(() => {
        api.getUser(comment.userId).then(res => {
            const user = res.user;
            setUser(user);
        })
    }, [])
    return (
        <View style={tw`flex-row`}>
            <Text style={tw`text-blue-500`}>{user.username}</Text>
            <Text>:{comment.text}</Text>
        </View>
    )
}

const PromotionItem = ({ commentInputActive, promotion, onShowCommentInput, onCloseCommentInput }) => {
    const navigation = useNavigation();
    const [modalImage, _setModalImage] = useState({ imgs: [], index: 0 });
    const [commentInput, setCommentInput] = useState("");
    const [merchant, setMerchant] = useState({});
    const [comments, setComments] = useState([]);
    const [showAllComment, setShowAllComment] = useState(false);
    useEffect(() => {
        api.getUser(promotion.user_id).then(res => {
            const merchant = res.user;
            setMerchant({
                id: merchant.id,
                username: merchant.username,
                avatar: merchant.avatar,
            });
        })
        api.getComments(promotion.id).then(res => {
            const resComments = res.comments;
            const comments = resComments.map(item => ({
                id: item.id,
                createTime: item.create_time,
                text: item.text,
                userId: item.user_id,
            }))
            setComments(comments)
        })
        // if (Object.keys(id2user).length == 0 || inited.current == true) {
        //     return;
        // }
        // const { id: userId, username, avatar, brief } = id2user[promotion.user_id];
        // setMerchant({
        //     id: userId,
        //     username: username,
        //     avatar: avatar,
        // });
        // inited.current = true
    }, []);
    const sendComment = async () => {
        if (commentInput == "") {
            return;
        }
        const text = commentInput;
        setCommentInput("");
        onCloseCommentInput();
        const res = await api.sendComment(text, promotion.id);
        const comment = {
            id: res.comment.id,
            createTime: res.comment.createTime,
            text: res.comment.text,
            userId: res.comment.user_id,
        };
        setComments([...comments, comment])
    }
    return (
        <View style={tw`flex-row gap-1 rounded-sm p-1 border-b-[#f7f7f7] border-b-4 `}>
            <View style={tw`items-center`}>
                <Pressable style={tw`w-12 h-12 `} onPress={() => { navigation.navigate('Profile', { userId: merchant.id }) }}>
                    {merchant.avatar && <Image style={tw`w-full h-full rounded-md`} source={{ uri: merchant.avatar }}></Image>}
                </Pressable>
                {promotion.is_top && <Text style={tw`text-lg text-white bg-red-500`}>置顶</Text>}
            </View>
            <View style={tw`flex-1 gap-1`}>
                <Text style={tw``}>{merchant.username}</Text>
                <Pressable onPress={() => { navigation.navigate('PromotionDetail', { promotionId: promotion.id, merchantId: merchant.id }) }}>
                    <Text numberOfLines={3} style={tw`text-black text-lg`}>{promotion.text}</Text>
                </Pressable>
                <ImageGroup imgs={promotion.imgs} onlyOneRow={true}></ImageGroup>
                <View style={tw`flex-row`}>
                    <View>
                        <Text>{promotion.uv}人浏览,{promotion.like}人点赞</Text>
                        <Text>发布于{promotion.create_time}</Text>
                    </View>
                    <View style={tw`flex-1 items-end justify-center`}>
                        {commentInputActive == false &&
                            <CommentIcon onPress={() => { setCommentInput(""); onShowCommentInput() }} fill={true}></CommentIcon>
                        }
                        {commentInputActive &&
                            <CommentIcon onPress={() => { setCommentInput(""); onCloseCommentInput() }}></CommentIcon>
                        }
                    </View>
                </View>

                <View style={tw`bg-[#f7f7f7] p-1 rounded-md`}>
                    {comments.filter((_, idx) => { return showAllComment ? true : idx < 4 }).map((comment, idx) => (
                        <Comment key={idx} comment={comment}></Comment>
                    ))}
                    {comments.length > 4 && (
                        <>
                            {!showAllComment && <Pressable onPress={setShowAllComment.bind(null, true)} style={tw`items-center border-t border-t-white`}><Text>展开更多</Text></Pressable>}
                            {showAllComment && <Pressable onPress={setShowAllComment.bind(null, false)} style={tw`items-center border-t border-t-white`}><Text>收起</Text></Pressable>}
                        </>
                    )
                    }
                </View>
                {commentInputActive && <View style={tw`flex-row gap-1`}>
                    <TextInput value={commentInput} onChangeText={text => setCommentInput(text)} multiline={true} style={tw`text-base flex-1 border border-gray-300 rounded-md`} placeholder="输入评论"></TextInput>
                    <Pressable onPress={() => { sendComment() }} style={tw`border-gray-300 border rounded-md w-13 justify-center items-center`}><Text style={tw`text-base`}>发送</Text></Pressable>
                </View>}
            </View>
        </View >
    )
}


// Promotion:["id", "create_time", "is_deleted", "user_id", "text", "imgs", "status", "is_top"]
// User:["id", "username", "brief", "avatar", "coin", "role", "location", "follow"]
const PromotionArea = ({ promotions }) => {
    const [showCommentInputIdx, setShowCommentInputIdx] = useState(-1);
    // const id2user = useRef({});
    useEffect(() => {
        // if (promotions.length != 0) {
        //     const userIds = new Set();
        //     promotions.forEach(item => {
        //         userIds.add(item.user_id);
        //     })
        //     // 不重复的获得各user信息
        //     const promises = [...userIds].map(id => api.getUser(id));
        //     Promise.all(promises).then(resList => {
        //         resList.forEach((resp, index) => {
        //             const thisGuy = resp.user;
        //             id2user.current[thisGuy.id] = thisGuy;
        //         });
        //         // console.log(id2user.current)
        //     })
        // }
    }, [promotions])
    return (
        <ScrollView style={tw`flex-1 p-1`}>
            <View style={tw`gap-2 bg-white`}>
                {promotions.map((datum, idx) => <PromotionItem key={idx} promotion={datum} commentInputActive={idx == showCommentInputIdx} onShowCommentInput={setShowCommentInputIdx.bind(null, idx)} onCloseCommentInput={setShowCommentInputIdx.bind(null, -1)}></PromotionItem>)}
            </View>
        </ScrollView>
    )
}

export default PromotionArea;