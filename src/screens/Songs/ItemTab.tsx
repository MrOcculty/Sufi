import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import cfs from '../../utils/fontUtils'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentSong, removeCurrentSong, setCurrentIndex } from '../../redux_toolkit/slices/currentSongSlice'
import SoundPlayer from 'react-native-sound-player'
import { addRelated, addSongsToQueue, emptyQueue } from '../../redux_toolkit/slices/enqueuedSlice'

const ItemTab = ({ from, index, id, name, singer, image }) => {
    const song = useSelector(state => state.currentSong)
    const currentPlaylist = useSelector(state => state.playlist)
    const currentAlbum = useSelector(state => state.album)
    const currentQueue = useSelector(state => state.currentQueue)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const playSong = async () => {

        if (from === "playlist") {
            currentQueue.queue.length !== 0 && dispatch(emptyQueue())
            dispatch(addSongsToQueue([...currentPlaylist.data?.items]))
        }
        if (from === "album") {
            currentQueue.queue.length !== 0 && dispatch(emptyQueue())
            dispatch(addSongsToQueue([...currentAlbum.data?.contents]))
        }
        // else {
        //     dispatch(addRelated(id))
        // }
        if (song.data) {
            SoundPlayer.stop()
            dispatch(removeCurrentSong())
        }
        dispatch(setCurrentIndex(index))
        dispatch(fetchCurrentSong(id))
        navigation.navigate("SongPage")
    }

    return (
        <TouchableOpacity onPress={playSong}>
            <View style={styles.itemTab}>
                <Image
                    source={image}
                    style={styles.songBanner}
                />
                <View style={styles.tabTexts}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.singer} numberOfLines={1}>{singer}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemTab

const styles = StyleSheet.create({
    itemTab: {
        paddingVertical: cfs(5),
        flex: 1,
        flexDirection: "row",
        columnGap: cfs(5),
        marginRight: cfs(90),
        width: cfs(250)
    },
    songBanner: {
        borderRadius: cfs(2),
        width: cfs(53),
        height: cfs(53)
    },
    tabTexts: {
        marginLeft: cfs(6)
    },
    name: {
        color: "white",
        fontSize: cfs(16),
        fontWeight: "bold",
    },
    singer: {
        color: "white",
        opacity: 0.6,
        fontSize: cfs(15),
        paddingVertical: cfs(4),
        fontWeight: "bold"
    }
})