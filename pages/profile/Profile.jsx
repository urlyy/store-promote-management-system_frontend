import { Text, Image, View, ScrollView, Pressable, Modal } from 'react-native'
import tw from 'twrnc';
import PromotionArea from '../../components/promotionArea/PromotionArea';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import api from './api'
import userStore from '../../stores/user';
import { TextInput } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { StarIcon, CommentIcon } from '../../components/Icons'
import dateFormat from '../../utils/dateFormat';
import ImageGroup from '../../components/ImageGroup'


const Comments2Merchant = ({ comments }) => {
    const navigation = useNavigation();
    const range = (l, r) => {
        const res = [];
        for (let i = l; i <= r; i++) {
            res.push(i);
        }
        return res;
    }
    return (
        <ScrollView>
            {comments.length == 0 && <Text style={tw`text-center bg-white text-xl p-1`}>暂无评价</Text>}
            {comments.map((item, idx) => (
                <View key={idx} style={tw`flex-row gap-1 w-full bg-white p-2 border-b`}>
                    <Pressable onPress={() => navigation.navigate("Profile", { userId: item.userId })} style={tw`w-12 h-12`}>
                        <Image style={tw`w-full h-full`} source={{ uri: item.avatar }}>
                        </Image>
                    </Pressable>
                    <View style={tw`flex-1 `}>
                        <View style={tw`justify-between flex-row`}>
                            <Text style={tw`text-xl text-black`}>{item.username}</Text>
                            <View style={tw`flex-row`}>
                                {range(1, 5).map(val => <StarIcon key={val} fill={val <= item.star} ></StarIcon>)}
                            </View>
                        </View>
                        <Text style={tw`text-xl`}>{item.text}</Text>
                        <ImageGroup imgs={item.imgs}></ImageGroup>
                        <View style={tw`w-full flex-row justify-between`}>
                            <Text style={tw``}>xxx人浏览,xxx人点赞</Text>
                            <Text style={tw`ml-auto`}>发表于{dateFormat(item.createTime)}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}


const OutCommentMerchantList = ({ userId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.getUserComments2Merchant(userId).then(res => {
            const comments = res.comments;
            setComments(comments.map((comment => ({
                id: comment.id,
                createTime: comment.create_time,
                text: comment.text,
                userId: comment.user_id,
                username: comment.username,
                star: comment.star,
                imgs: comment.imgs,
            }))));
        })
    }, [])
    return (
        <Comments2Merchant comments={comments}></Comments2Merchant>
    )
}

const OutFollowList = ({ userId }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.getFollowList(userId).then((res) => {
            const users = res.users;
            setUsers(users.map(u => ({
                ...u
            })));
            console.log(users);
        })
    }, []);
    const follow = async (idx) => {
        const user = users[idx];
        const res = await api.follow(user.id)
        if (res.success == true) {
            const newData = JSON.parse(JSON.stringify(users))
            newData[idx].follow = true;
            setUsers(newData);
        }

    }
    const followCancel = async (idx) => {
        const user = users[idx];
        const res = await api.followCancel(user.id)
        if (res.success == true) {
            const newData = JSON.parse(JSON.stringify(users))
            newData[idx].follow = false;
            setUsers(newData);
        }
    }
    return (
        <ScrollView style={tw`flex-1 p-1`}>
            {users.length == 0 ?
                (<View style={tw` items-center w-full`}><Text style={tw`flex text-black text-2xl`}>ta还没关注任何人哦</Text></View>) :
                (
                    users.map((datum, idx) => (
                        <View key={idx} style={tw`p-2 flex-row gap-1 border-b-[#f7f7f7] border-b-4`}>
                            <Pressable style={tw`w-16 h-16`} onPress={() => navigation.navigate("Profile", { userId: datum.id })}>
                                {datum.avatar && <Image style={tw`w-full h-full rounded-full`} source={{ uri: datum.avatar }}></Image>}
                            </Pressable>
                            <View style={tw`flex-1 items-center flex-row`}>
                                <View style={tw`justify-around`}>
                                    <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                    <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                </View>
                                {/* <View style={tw`items-center`}>
                                        <Text style={tw`text-xl text-black`}>{datum.username}</Text>
                                        <Text style={tw`w-full text-xl`} numberOfLines={2} ellipsizeMode="tail" >{datum.brief}</Text>
                                    </View> */}
                                <View style={tw`ml-auto `}>
                                    {datum.follow ?
                                        (<Pressable style={tw`p-1 bg-white border border-black rounded-xl`} onPress={() => { followCancel(idx) }}><Text style={tw`text-xl text-black`}>取消关注</Text></Pressable>) :
                                        (<Pressable style={tw`p-1 bg-yellow-400 rounded-xl`} onPress={() => { follow(idx) }}><Text style={tw`text-xl text-white`}>关注</Text></Pressable>)
                                    }
                                </View>
                            </View>
                        </View>
                    ))
                )
            }
        </ScrollView>
    )
}

const InCommentList = ({ merchantId, myRole, myId }) => {
    const [comments, setComments] = useState([]);
    const { avatar, username } = userStore();
    const [commentInput, setCommentInput] = useState("");
    const [commentInputActive, setCommentInputActive] = useState(false);
    const [commentImgs, setCommentImgs] = useState([]);
    const [star, setStar] = useState(0);
    useEffect(() => {
        api.getComments2Merchant(merchantId).then(res => {
            const comments = res.comments;
            setComments(comments.map((comment => ({
                id: comment.id,
                createTime: comment.create_time,
                text: comment.text,
                userId: comment.user_id,
                username: comment.username,
                star: comment.star,
                imgs: comment.imgs,
            }))))
        })
    }, [])
    const getLocalPic = async () => {
        const options = {}
        const result = await launchImageLibrary(options);
        setCommentImgs([...commentImgs, result.assets[0].uri]);
    }
    const sendComment = async () => {
        if (commentInput == "" || star == 0) {
            return;
        }
        setCommentInputActive(false);
        const files = commentImgs.map((img, idx) => ({
            uri: img,
            type: `multipart/form-data`,
            name: `image${idx}.png`,
        }))
        const res = await api.sendComment2Merchant(merchantId, commentInput, files, star);
        const comment = {
            id: res.comment.id,
            createTime: res.comment.create_time,
            text: res.comment.text,
            userId: res.comment.user_id,
            username: username,
            star: res.comment.star,
            imgs: res.comment.imgs,
        };
        setComments([...comments, comment]);
        setCommentInput("");
        setStar(0);
        setCommentImgs([]);
    };
    return (
        <View style={tw`w-full p-1`}>
            {myRole != 1 && myId != merchantId && <View>
                {!commentInputActive && <Pressable onPress={() => { setCommentInputActive(true); }} style={tw`items-center bg-blue-400 rounded-md mb-1 p-1`}>
                    <Text style={tw`text-2xl text-white`}>发表评论</Text>
                </Pressable>}
                {commentInputActive && <Pressable onPress={() => { setCommentInputActive(false); setCommentImgs(""); setCommentImgs([]); setStar(0); }} style={tw`items-center bg-slate-400 rounded-md mb-1 p-1`}>
                    <Text style={tw`text-2xl text-white`}>收回</Text>
                </Pressable>}
                {commentInputActive &&
                    <View style={tw`p-1 bg-white gap-2`}>
                        <ImageGroup imgs={commentImgs}></ImageGroup>
                        <View style={tw`flex-row`}>
                            {[1, 2, 3, 4, 5].map(val => (
                                <StarIcon key={val} fill={val <= star} onPress={setStar.bind(null, val)}></StarIcon>
                            ))}
                        </View>
                        <View style={tw`flex-row`}>
                            <TextInput onChangeText={text => setCommentInput(text)} value={commentInput} multiline={true} style={tw`flex-1 border-l border-t border-b border-black rounded-l-lg`}></TextInput>
                            <Pressable onPress={sendComment} style={tw`justify-center border-r border-t border-b rounded-r-lg p-1`}>
                                <Text style={tw`text-lg`}>发送</Text>
                            </Pressable>
                            <Pressable onPress={getLocalPic} style={tw`justify-center border rounded-md p-1 bg-blue-400 ml-1`}>
                                <Text style={tw`text-lg text-white`}>+图片</Text>
                            </Pressable>
                        </View>
                    </View>}
            </View>}
            <Comments2Merchant comments={comments}></Comments2Merchant>
        </View>
    )
}

const TopBar = ({ type, userRole, onChange }) => {
    const changeContent = (t) => {
        onChange(t);
    }
    return (
        <View style={tw`w-full items-center flex-row gap-1`}>
            {userRole == 1 && (
                <>
                    <Pressable onPress={changeContent.bind(null, "Promotions")} style={tw`flex-1 bg-white p-1 rounded-md`}>
                        <Text style={tw`${type == "Promotions" ? "text-blue-400" : ""} text-center text-2xl`}>商家推广</Text>
                    </Pressable>
                    <Pressable onPress={changeContent.bind(null, "InCommentList")} style={tw`flex-1 bg-white p-1 rounded-md`}>
                        <Text style={tw`${type == "InCommentList" ? "text-blue-400" : ""} text-center text-2xl`}>客户评价</Text>
                    </Pressable>
                </>
            )}
            {userRole != 1 && (
                <>
                    <Pressable onPress={changeContent.bind(null, "OutCommentMerchantList")} style={tw`flex-1 bg-white p-1 rounded-md`}>
                        <Text style={tw`${type == "OutCommentMerchantList" ? "text-blue-400" : ""} text-2xl text-center`}>历史评价</Text>
                    </Pressable>
                    <Pressable onPress={changeContent.bind(null, "OutFollowList")} style={tw`flex-1 bg-white p-1 rounded-md`}>
                        <Text style={tw`${type == "OutFollowList" ? "text-blue-400" : ""} text-2xl text-center`}>关注列表</Text>
                    </Pressable>
                </>
            )}
        </View>
    )
}


const Profile = ({ route }) => {
    const { userId } = route.params;
    const [user, setUser] = useState({});
    const [promotions, setPromotions] = useState([]);
    const [contentType, setContentType] = useState(null);
    const { id, role } = userStore();
    useEffect(() => {
        api.getUser(userId).then((res) => {
            const u = res.user;
            setUser(u);
            //商家
            if (u.role == 1) {
                api.getPromotions(userId).then((res) => {
                    const p = res.promotions;
                    setPromotions(p);
                })
                setContentType("Promotions");
            } else {
                setContentType("OutCommentMerchantList");
            }
        })

    }, [])
    const handleFollow = async () => {
        const res = await api.follow(user.id);
        if (res.success) {
            setUser({ ...user, follow: true });
        }
    }
    const handleFollowCancel = async () => {
        const res = await api.followCancel(user.id);
        if (res.success) {
            setUser({ ...user, follow: false });
        }
    }
    return (
        <View style={tw`flex-1`}>
            <View style={tw`flex-row gap-2 h-32 items-center relative`}>
                {user.avatar && <Image blurRadius={2} style={tw`w-full h-full -z-10 absolute`} source={{ uri: user.avatar }}></Image>}
                {/* <View style={tw`a`}></View> */}
                <View style={tw`items-center p-1`}>
                    {user.avatar && <Image style={tw`rounded-full w-20 h-20`} source={{ uri: user.avatar }}></Image>}
                    {id != userId && <View style={tw`flex-row gap-1`}>
                        <Pressable onPress={() => navigation.navigate("PrivateMessage", { userId: userId })} style={tw` p-1 items-center bg-sky-400 rounded-md`}>
                            <Text style={tw`text-xl text-white font-bold`}>私信</Text>
                        </Pressable>
                        {user.follow == false && <Pressable onPress={handleFollow} style={tw`p-1 items-center bg-green-400 rounded-md`}>
                            <Text style={tw`text-xl text-white font-bold`}>关注</Text>
                        </Pressable>}
                        {user.follow == true && <Pressable onPress={handleFollowCancel} style={tw`p-1 items-center bg-red-400 rounded-md`}>
                            <Text style={tw`text-xl text-white font-bold`}>取关</Text>
                        </Pressable>}
                    </View>}
                </View>
                <View style={tw`flex-1 relative h-full justify-center`}>
                    <View style={tw`bg-white w-full h-20 opacity-50 absolute -z-10 rounded-lg`}></View>
                    <Text style={tw`text-xl text-black`}>{user.username}</Text>
                    <Text style={tw`text-xl text-black`}>简介:{user.brief}</Text>
                    {user.role == 1 && <Text style={tw`text-xl text-black`}>发布:{promotions.length}</Text>}
                </View>
            </View>
            <TopBar type={contentType} userRole={user.role} onChange={setContentType}></TopBar>
            {contentType == "Promotions" && <PromotionArea promotions={promotions}></PromotionArea>}
            {contentType == "InCommentList" && <InCommentList myId={id} myRole={role} merchantId={userId} promotions={promotions}></InCommentList>}
            {contentType == "OutCommentMerchantList" && <OutCommentMerchantList userId={userId}></OutCommentMerchantList>}
            {contentType == "OutFollowList" && <OutFollowList userId={userId}></OutFollowList>}
        </View >
    )
}
export default Profile;