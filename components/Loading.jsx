import tw from 'twrnc'
import { View, Modal, ActivityIndicator } from 'react-native'


const Loading = ({ visible = false }) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={tw`bg-white opacity-80 h-full w-full items-center justify-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    )
}

export default Loading;
