
import { ScrollView, RefreshControl } from 'react-native'
import { useState } from 'react'
import Toast from 'react-native-toast-message';

const MyScrollView = ({
    style = {},
    children,
    onTopRefresh,
    onBottomRefresh,
}) => {
    const [refreshing, setRefreshing] = useState(false);


    const handleTopRefresh = async () => {
        if (onTopRefresh != undefined && refreshing === false) {
            setRefreshing(true);
            await onTopRefresh();
            Toast.show({
                type: 'success',
                text1: '已加载到更多',
                position: "top",
                visibilityTime: 500,
            });
            setRefreshing(false);
        }
    };

    const handleBottomRefresh = async (e) => {
        if (onBottomRefresh != undefined && refreshing === false) {
            const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
            const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
            const scrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
            if (Math.ceil(offsetY + scrollHeight) >= contentSizeHeight) {
                console.log("开始拉取新数据");
                setRefreshing(true);
                await onBottomRefresh()
                Toast.show({
                    type: 'success',
                    text1: '已加载到更多',
                    position: "bottom",
                    visibilityTime: 500,
                });
                setRefreshing(false);
            }
        }
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleTopRefresh} />
            }
            onMomentumScrollEnd={handleBottomRefresh}
            style={style}
        >
            {children}
        </ScrollView>
    )
}

export default MyScrollView;