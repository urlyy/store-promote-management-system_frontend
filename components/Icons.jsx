import { Pressable } from 'react-native';
import Svg, { Polygon, Path } from 'react-native-svg';
import tw from 'twrnc';

export const StarIcon = ({ width = 27, height = 27, onPress = () => { }, fill = false }) => (
    <Pressable onPress={onPress}>
        <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill ? "brown" : "none"} stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </Svg>
    </Pressable>
);



export const CommentIcon = ({ width = 27, height = 27, fill = false, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Svg width={width} height={height} viewBox="0 0 24 24">
                <Path
                    d="M21 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H4V22L9.414 17.586C9.78899 17.211 10.3467 17 11 17H18C19.1046 17 20 16.1046 20 15V4C20 2.89543 19.1046 2 18 2ZM18 15H13V19.586L10 22L7 19.586V15H3V4H18V15Z"
                    fill={fill ? 'black' : 'red'}
                />
            </Svg>
        </Pressable>

    )
}