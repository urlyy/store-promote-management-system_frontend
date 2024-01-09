import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import tw from 'twrnc';
import { Col, Row, Grid } from "react-native-easy-grid";
import { useNavigation } from '@react-navigation/native';

const PromotionItem = ({ data }) => {
    const navigation = useNavigation();
    return (
        <View style={tw`flex-row gap-1 rounded-sm p-1 border-b-[#f7f7f7] border-b-4`}>
            {/* <Text>{data.merchantAvatar}</Text> */}
            <View>
                <Pressable onPress={() => { navigation.navigate('Profile') }}>
                    <Image style={tw`w-12 h-12 rounded-md`} source={require('./avatar.jpg')}></Image>
                </Pressable>

            </View>
            <View style={tw`flex-1 gap-1`}>
                <View style={tw`gap-1 flex-row items-center`}>
                    <Text style={tw`text-black text-lg`}>{data.merchantName}</Text>
                    {data.isTop && <Text style={tw`text-lg text-white bg-red-500`}>置顶</Text>}
                </View>
                <Pressable onPress={() => { navigation.navigate('PromotionDetail') }}>
                    <Text numberOfLines={3}>{data.text}</Text>
                </Pressable>
                <View style={tw`flex-row gap-1`}>
                    {[0, 1, 2].map((_, idx) => {
                        let child = null;
                        // child = <Text style={tw`text-white`}>1</Text>
                        if (data.images.length - 1 < idx) {
                            child = <></>
                        } else {
                            const img = data.images[idx];
                            const imgStyle = 'w-full h-30'
                            if (idx == 2 && data.images.length > 3) {
                                child = (
                                    <Pressable style={tw.style(imgStyle)} onPress={() => { }}>
                                        <View style={tw`absolute bg-black opacity-40 z-2 w-full h-full justify-center items-center`}>
                                            <Text style={tw`text-white font-extrabold text-lg`}>查看更多</Text>
                                        </View>
                                        <Image style={tw`w-full h-full`} source={require('./avatar.jpg')}></Image>
                                    </Pressable>
                                )
                            } else {
                                child = (
                                    <Pressable style={tw`${imgStyle}`} onPress={() => { }}>
                                        <Image style={tw`w-full h-full`} source={require('./avatar.jpg')}></Image>
                                    </Pressable>
                                )
                            }
                        }
                        return <View key={idx} style={tw`relative flex-1 bg-black items-center`}>{child}</View>
                    })}
                </View>
                <View style={tw`flex-row`}>
                    <View>
                        <Text>{data.uv}人浏览,{data.like}人点赞</Text>
                        <Text>发布于{data.createTime}</Text>
                    </View>
                    <View style={tw`flex-1 items-end justify-center`}>
                        <Pressable>
                            <Text style={tw`text-black text-2xl`}>发送评论</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={tw`bg-[#f7f7f7] p-1 rounded-md`}>
                    {data.comments.map((comment, idx) => (
                        <View key={idx} style={tw`flex-row`}>
                            <Text style={tw`text-blue-500`}>{comment.username}</Text>
                            <Text>:{comment.text}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View >
    )
}


export default PromotionItem;