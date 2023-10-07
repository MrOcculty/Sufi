import React, { useEffect } from 'react'
import Container from '../../components/Container'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import cfs from '../../utils/fontUtils'
import ItemTab from './ItemTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchedSongs } from '../../redux_toolkit/slices/searchedSongsSlice'

const Songs = () => {

    const dispatch = useDispatch()
    const query = useSelector(state => state.generalData.searchQuery)
    const searchedSongs = useSelector(state => state.searchedSongs)
    const currentSong = useSelector(state => state.currentSong)
    useEffect(() => {
        if (query) {
            !searchedSongs.data && dispatch(fetchSearchedSongs(query))
        }
    }, [])
    return (
        <Container heading='Songs' navbar="true" >
            <ScrollView style={{
                height: Dimensions.get('window').height - (currentSong.data ? cfs(235) : cfs(165)),
                marginLeft: cfs(20)
            }}>
                {searchedSongs.data?.contents?.map(content => <View key={content.title?.text}>
                    {content.title && content.contents?.map(song => <ItemTab key={song.id} from="song" index={0} id={song.id} name={song.title} singer={song.artists?.map((artist) => artist.name).join(", ") || song.overlay?.content?.pause_label?.split('-')[1].trim()} image={
                        { uri: song?.thumbnail?.contents?.[0]?.url }
                    } />)}
                </View>)}
            </ScrollView>
        </Container>
    )
}

export default Songs