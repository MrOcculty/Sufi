import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from './ItemTab'
import { fetchSearchedArtists } from '../../redux_toolkit/slices/searchedArtistsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Artists = () => {

  const dispatch = useDispatch()
  const query = useSelector(state => state.generalData.searchQuery)
  const searchedArtists = useSelector(state => state.searchedArtists)
  const currentSong = useSelector(state => state.currentSong)

  useEffect(() => {
    if (query) {
      !searchedArtists.data && dispatch(fetchSearchedArtists(query))
    }
  }, [])

  return (
    <>
      <Container heading='Artists' navbar="true" >
        <ScrollView style={{
          height: Dimensions.get('window').height - (currentSong.data ? cfs(235) : cfs(165)),
          marginLeft: cfs(20)
        }}>
          {searchedArtists.data?.contents?.map(content => <View key={content.header?.title?.text}>
            {content.title && content.contents?.map(artist => <ItemTab key={artist.id} id={artist.id} name={artist.name} subs={artist.subscribers} image={{
              uri: artist.thumbnail?.contents?.[0]?.url
            }} />)
            }</View>)}
        </ScrollView>
      </Container>
    </>
  )
}

export default Artists