import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import cfs from '../../utils/fontUtils'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { fetchAlbum } from '../../redux_toolkit/slices/albumSlice'

const ItemTab = ({ id, name, by, year, image }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handlePress = () => {
        dispatch(fetchAlbum(id))
        navigation.navigate("AlbumPage")
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemTab}>
                <Image
                    source={image}
                    style={styles.songBanner}
                />
                <View style={styles.tabTexts}>
                    <Text style={styles.name} numberOfLines={2}>{name}</Text>
                    <Text style={styles.by} numberOfLines={2}>{by}</Text>
                    <Text style={styles.year} numberOfLines={2}>{year}</Text>
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
        alignItems: "center",
        flexDirection: "row",
        columnGap: cfs(5),
        marginRight: cfs(90),
        width: cfs(220)
    },
    songBanner: {
        borderRadius: cfs(3),
        width: cfs(100),
        height: cfs(100)
    },
    tabTexts: {
        marginLeft: cfs(6)
    },
    name: {
        paddingVertical: cfs(2),
        color: "white",
        fontSize: cfs(16),
        fontWeight: "bold",
    },
    by: {
        color: "white",
        opacity: 0.6,
        fontSize: cfs(15),
        paddingVertical: cfs(2),
        fontWeight: "bold"
    },
    year: {
        color: "white",
        opacity: 0.6,
        fontSize: cfs(13),
        paddingVertical: cfs(2),
        fontWeight: "bold"
    }
})