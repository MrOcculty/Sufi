import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from './ItemTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchedPlaylists } from '../../redux_toolkit/slices/searchedPlaylistsSlice'

const Playlists = () => {

  const dispatch = useDispatch()
  const query = useSelector(state => state.generalData.searchQuery)
  const currentSong = useSelector(state => state.currentSong)
  const searchedPlaylists = useSelector(state => state.searchedPlaylists)
  useEffect(() => {
    if (query) {
      !searchedPlaylists.data && dispatch(fetchSearchedPlaylists(query))
    }
  }, [])

  return (
    <Container heading='Playlists' navbar="true" >
      <ScrollView style={{
        height: Dimensions.get('window').height - (currentSong.data ? cfs(235) : cfs(165)),
        marginLeft: cfs(20)
      }}>
        {searchedPlaylists.data?.contents?.map(content => <View key={content.title?.text}>
          {content.title && content.contents?.map(playlist => <ItemTab key={playlist.id} id={playlist.id} name={playlist.title} by={playlist.author?.name} songs={playlist.item_count} image={{
            uri: playlist.thumbnail?.contents?.[2]?.url
          }} />)}</View>)}
      </ScrollView>
    </Container>
  )
}

export default Playlists