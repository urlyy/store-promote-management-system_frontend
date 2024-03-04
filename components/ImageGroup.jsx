import { View, Text, Pressable, ScrollView, Image, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { useState } from 'react';
import tw from 'twrnc';


const MyImage = ({ source, allowDelete, onDelete }) => {
    return (
        <View style={tw`w-full relative`}>
            {allowDelete == true && (
                <Pressable onPress={onDelete} style={tw`bg-red-300 absolute right-0 top-0 z-50`}>
                    <Text style={tw`text-white text-lg`}>删除</Text>
                </Pressable>
            )}
            <Image style={tw`w-full aspect-square`} source={source}></Image>
        </View>
    )
}

const ImageGroup = ({ imgs, onlyOneRow = false, allowDelete = false, onDelete = (idx) => { } }) => {
    const [modalImage, _setModalImage] = useState({ imgs: [], index: 0 });
    const setAllModalImage = (imgs, idx) => {
        _setModalImage({
            imgs: imgs.map((img, idx) => ({
                url: img
            })),
            index: idx
        });
    };
    const clearModalImage = () => {
        _setModalImage({ imgs: [], index: 0 });
    }
    const range = (l, r) => {
        const res = [];
        for (let i = l; i <= r; i++) {
            res.push(i);
        }
        return res;
    }
    const rowNumber = () => {
        if (onlyOneRow == true) {
            return 1;
        } else {
            return Math.ceil(imgs.length / 3)
        }
    }
    const handleDelete = (idx) => {
        onDelete(idx);
    }
    return (
        <View>
            <Modal visible={modalImage.imgs.length != 0}>
                <ImageViewer index={modalImage.index} imageUrls={modalImage.imgs} onClick={() => { clearModalImage(); }} />
            </Modal>
            {imgs && imgs.length > 0 && range(0, rowNumber() - 1).map((_, rowIdx) =>
            (
                <View key={rowIdx} style={tw`w-full flex-row  gap-2`}>
                    <View style={tw`flex-1`}>
                        {rowIdx * 3 < imgs.length && <Pressable onPress={() => { setAllModalImage(imgs, rowIdx * 3) }}>
                            <MyImage onDelete={handleDelete.bind(null, rowIdx * 3)} allowDelete={allowDelete} source={{ uri: imgs[rowIdx * 3] }}></MyImage>
                        </Pressable>}
                    </View>
                    <View style={tw`flex-1`}>
                        {rowIdx * 3 + 1 < imgs.length && <Pressable onPress={() => { setAllModalImage(imgs, rowIdx * 3 + 1) }}>
                            <MyImage onDelete={handleDelete.bind(null, rowIdx * 3 + 1)} allowDelete={allowDelete} source={{ uri: imgs[rowIdx * 3 + 1] }}></MyImage>
                        </Pressable>}
                    </View>
                    <View style={tw`flex-1`}>
                        {rowIdx * 3 + 2 < imgs.length && <Pressable onPress={() => { setAllModalImage(imgs, rowIdx * 3 + 2) }}>
                            <MyImage onDelete={handleDelete.bind(null, rowIdx * 3 + 2)} allowDelete={allowDelete} source={{ uri: imgs[rowIdx * 3 + 2] }}></MyImage>
                            {onlyOneRow == true && imgs.length > 3 && <View style={tw`absolute bg-black opacity-40 z-2 w-full h-full justify-center items-center`}>
                                <Text style={tw`text-white font-extrabold text-lg`}>查看更多</Text>
                            </View>}
                        </Pressable>}
                    </View>
                </View>
            ))}
        </View>
    )
}

export default ImageGroup;