import { Text, View, Pressable } from "react-native";
import tw from 'twrnc';
import { useRef } from "react";
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({ }) => {
    const navigation = useNavigation();
    const items = useRef([
        { text: "首页", to: "Home" },
        { text: "消息", to: "Notification" },
        { text: "我的", to: "Mine" },
    ]);
    return (
        <View style={tw`flex-row bg-white h-13 `}>
            {items.current.map((item, idx) => (
                <Pressable style={tw`flex-1 items-center justify-center`} key={idx} onPress={() => { navigation.navigate(item.to) }}>
                    <Text style={tw`text-xl`}>{item.text}</Text>
                </Pressable>

            ))}
        </View>
    )
}
export default BottomBar;