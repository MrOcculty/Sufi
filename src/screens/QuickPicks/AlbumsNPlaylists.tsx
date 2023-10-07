import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import cfs from '../../utils/fontUtils'
import { useNavigation } from '@react-navigation/native'
import { fetchAlbum } from '../../redux_toolkit/slices/albumSlice'
import { useDispatch } from 'react-redux'
import { fetchArtist } from '../../redux_toolkit/slices/artistSlice'
import { fetchPlaylist } from '../../redux_toolkit/slices/playlistSlice'

const AlbumsNPlaylists = ({ id, title, subtitle, image, type }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const navigate = () => {
        if (type === "artist") {
            dispatch(fetchArtist(id))
            navigation.navigate("ArtistPage")
        }
        if (type === "album") {
            dispatch(fetchAlbum(id))
            navigation.navigate("AlbumPage")
        }
        if (type === "playlist") {
            dispatch(fetchPlaylist(id))
            navigation.navigate("PlaylistPage")
        }
    }
    return (
        <TouchableOpacity onPress={() => navigate()} style={styles.quickPicksTabs}>
            <Image
                source={image}
                style={[styles.artistBanner, { borderRadius: type === "artist" ? cfs(55) : cfs(3) }]}
            />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subTitle} numberOfLines={1}>{subtitle}</Text>
        </TouchableOpacity>
    )
}

export default AlbumsNPlaylists

const styles = StyleSheet.create({
    quickPicksTabs: {
        paddingVertical: cfs(12),
        flex: 1,
        columnGap: cfs(5),
        width: cfs(100),
        height: cfs(180)
    },
    artistBanner: {
        height: cfs(110),
        width: cfs(110),
        borderRadius: cfs(3)
    },
    title: {
        width: cfs(110),
        textAlign: "center",
        paddingTop: cfs(10),
        paddingBottom: cfs(5),
        color: "white",
        fontSize: cfs(16),
        fontWeight: "bold",
    },
    subTitle: {
        width: cfs(110),
        textAlign: "center",
        color: "white",
        opacity: 0.6,
        fontSize: cfs(15),
        fontWeight: "bold"
    }
})