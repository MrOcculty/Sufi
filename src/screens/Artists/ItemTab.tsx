import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import cfs from '../../utils/fontUtils'
import { useNavigation } from '@react-navigation/native'
import { fetchArtist } from '../../redux_toolkit/slices/artistSlice'
import { useDispatch } from 'react-redux'

const ItemTab = ({ id, name, subs, image }) => {
    const navigation = useNavigation()
    const diapatch = useDispatch()
    const handlePress = () => {
        diapatch(fetchArtist(id))
        navigation.navigate("ArtistPage")
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemTab}>
                <Image
                    source={image}
                    style={styles.songBanner}
                />
                <View style={styles.tabTexts}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.subs} numberOfLines={1}>{subs}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemTab

const styles = StyleSheet.create({
    itemTab: {
        paddingVertical: cfs(8),
        flex: 1,
        flexDirection: "row",
        columnGap: cfs(5),
        marginRight: cfs(90),
        width: cfs(250)
    },
    songBanner: {
        borderRadius: cfs(30),
        width: cfs(60),
        height: cfs(60)
    },
    tabTexts: {
        marginLeft: cfs(6)
    },
    name: {
        paddingVertical: cfs(4),
        color: "white",
        fontSize: cfs(16),
        fontWeight: "bold",
    },
    subs: {
        color: "white",
        opacity: 0.6,
        fontSize: cfs(15),
        paddingVertical: cfs(2),
        fontWeight: "bold"
    }
})