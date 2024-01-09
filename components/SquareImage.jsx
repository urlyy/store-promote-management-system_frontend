import { Image, StyleSheet, View } from "react-native"
const SquareImage = ({ src }) => {
    return (
        <View class={styles.Container}>
            <Image class={styles.Image} source={src}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    Image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    Container: {
        width: "100%",
        paddingTop: "100%",
        position: "relative",
    }
});

export default SquareImage;