import { Pressable, View } from 'react-native';
import Svg, { Polygon, Path, Circle, G } from 'react-native-svg';
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

export const MaleIcon = ({ width = 27, height = 27 }) => {
    return (

        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024">
            <Path
                d="M872.335 421.516V151.71H602.528L702.949 252.13 601.4 353.68c-46.47-32.81-103.174-52.091-164.385-52.091-157.595 0-285.351 127.756-285.351 285.35S279.421 872.29 437.014 872.29s285.352-127.755 285.352-285.35c0-57.78-17.19-111.537-46.711-156.47l102.818-102.814 93.862 93.861zM437.015 782.18c-107.827 0-195.24-87.413-195.24-195.24s87.413-195.24 195.24-195.24 195.24 87.413 195.24 195.24-87.413 195.24-195.24 195.24z"
                fill="#1296DB"
            />
        </Svg>

    );
};

export const FemaleIcon = ({ width = 27, height = 27 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
            <Path d="M857.6 407.04a347.8016 347.8016 0 1 0-395.5712 344.4224v38.0416h-55.296a46.08 46.08 0 0 0 0 92.16h55.296v51.7632a46.08 46.08 0 0 0 92.16 0V881.664H609.28a46.08 46.08 0 0 0 0-92.16h-55.296v-37.5808a348.16 348.16 0 0 0 303.616-344.8832z m-603.4432 0a255.6416 255.6416 0 1 1 255.6416 255.6416A256 256 0 0 1 254.1568 407.04z" fill="#FC5B67" p-id="13335">
            </Path>
        </Svg>

    );
};

