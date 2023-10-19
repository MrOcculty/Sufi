import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import cfs from '../../utils/fontUtils'

const QPArtist = ({ name, followers, image }) => {
    return (
        <View style={styles.aritisTab}>
            <Image
                source={image}
                style={styles.artistBanner}
            />
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.followers} numberOfLines={1}>{followers}</Text>
        </View>
    )
}

export default QPArtist

const styles = StyleSheet.create({
    aritisTab: {
        paddingVertical: cfs(12),
        flex: 1,
        columnGap: cfs(5),
        width: cfs(100),
        height: cfs(150)
    },
    artistBanner: {
        height: cfs(90),
        width: cfs(90),
        borderRadius: cfs(45)
    },
    name: {
        paddingVertical: cfs(5),
        width: cfs(90),
        textAlign: "center",
        color: "white",
        fontSize: cfs(16),
        fontWeight: "bold",
    },
    followers: {
        width: cfs(90),
        textAlign: "center",
        color: "white",
        opacity: 0.6,
        fontSize: cfs(13),
        fontWeight: "bold"
    }
})