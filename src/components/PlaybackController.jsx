import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SoundPlayer from 'react-native-sound-player'
import { setCurrentTime, fetchCurrentSong, setCurrentIndex, toggleIsPlaying } from '../redux_toolkit/slices/currentSongSlice'
import cfs from '../utils/fontUtils'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from "@env"

const PlaybackControllerDisplayer = () => {
    const song = useSelector(state => state.currentSong)
    return (
        <>
            {song.data && <PlaybackController />}
        </>
    )
}

const PlaybackController = () => {

    const song = useSelector(state => state.currentSong)
    const currentQueue = useSelector(state => state.currentQueue)
    const bgColor = useSelector(state => state.currentSong.data?.basic_info?.bgColor || state.generalData.bgColor)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    let _onFinishedPlayingSubscription = null

    useEffect(() => {
        _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', async (data) => {
            song.isPlaying && dispatch(toggleIsPlaying())
            if (data.success) {
                next()
            } else {
                console.log('Playback failed due to audio decoding errors')
            }
        })

        let intervalId

        const changeTime = async () => {

            const time = await SoundPlayer.getInfo()
            console.log(time)
            dispatch(setCurrentTime(Math.round(time.currentTime)))
        }

        if (song.currentTime >= song.data?.basic_info.duration) {
            clearInterval(intervalId)
            dispatch(setCurrentTime(0))
        }

        intervalId = setInterval(async () => await changeTime(), 1000)

        if (song.data) {
            console.log(song.data?.basic_info.id)
            try {
                SoundPlayer.playUrl(`${BASE_URL}/stream?id=${song.data?.basic_info.id}`)
                !song.isPlaying && dispatch(toggleIsPlaying())
            }
            catch (err) {
                console.log(err)
            }
        }

        if (song.isPlaying) {
            getInfo()
        }

        return () => {
            _onFinishedPlayingSubscription.remove('FinishedPlaying')
        }

    }, [song.data])

    const play = () => {
        try {
            if (song.isPlaying) {
                SoundPlayer.pause()
                dispatch(toggleIsPlaying())
            }
            else {
                SoundPlayer.play()
                dispatch(toggleIsPlaying())
            }
        } catch (error) {
            console.log(`cannot play the sound file`, error)
        }
    }

    const next = () => {
        if (song.currentIndex) {
            SoundPlayer.stop()
            dispatch(setCurrentTime(0))
            if (currentQueue.queue?.length > song.currentIndex + 1) {
                SoundPlayer.stop()
                const nextSongId = currentQueue.queue[song.currentIndex + 1].id
                dispatch(setCurrentIndex(song.currentIndex + 1))
                dispatch(fetchCurrentSong(nextSongId))
            }
            else {
                dispatch(setCurrentIndex(0))
                dispatch(fetchCurrentSong(currentQueue.queue[0].id))
            }
        }
    }

    return (

        <TouchableOpacity onPress={() => navigation.navigate("SongPage")}>
            <View style={[styles.bottomTab, { backgroundColor: bgColor }]}>
                <Image
                    source={{ uri: song.data?.basic_info?.thumbnail?.[0]?.url }}
                    style={{ height: cfs(40), width: cfs(40), borderRadius: cfs(1) }}
                />
                <View style={{ width: cfs(200), flex: 1 }}>
                    <Text numberOfLines={1} style={[styles.text]}>{song.data?.basic_info?.title}</Text>
                    <Text numberOfLines={1} style={[styles.text, { opacity: 0.6 }]}>{song.data?.basic_info?.author}</Text>
                </View>
                <TouchableOpacity style={styles.controls} onPress={() => play()}>
                    {
                        song.isPlaying ? <Image
                            source={require("../assets/icons/pause.png")}
                            style={{ height: cfs(20), width: cfs(20) }}
                        /> : <Image
                            source={require("../assets/icons/play.png")}
                            style={{ height: cfs(20), width: cfs(20) }}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.controls} onPress={next}>
                    <Image
                        source={require('../assets/icons/change.png')}
                        style={{ height: cfs(24), width: cfs(24) }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default PlaybackControllerDisplayer

const styles = StyleSheet.create({
    bottomTab: {
        height: cfs(70),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: cfs(15),
        paddingHorizontal: cfs(10),
        paddingBottom: cfs(10)
    },
    text: {
        fontSize: cfs(16),
        fontWeight: "bold",
        color: "#ffffff"
    },
    controls: {
        borderRadius: cfs(12.5),
        width: cfs(25),
    }
})