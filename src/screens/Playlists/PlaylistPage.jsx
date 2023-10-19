import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from '../Songs/ItemTab'
import { useSelector } from 'react-redux'

const PlaylistPage = () => {
  const playlist = useSelector(state => state.playlist)
  const currentSong = useSelector(state => state.currentSong)

  return (
    <>
      <Container heading={playlist.data?.header?.title?.text} navbar={false} >
        <ScrollView style={{
          height: Dimensions.get('window').height - (currentSong.data ? cfs(170) : cfs(100)),
          marginLeft: cfs(20)
        }}>
          <Image
            source={{ uri: playlist.data?.header.thumbnails?.[0]?.url }}
            style={styles.img}
          />
          {playlist.data?.items?.map((item, index) => <ItemTab key={item.id} from="playlist" index={index} id={item.id} name={item.title} singer={item.artists?.map(artist => artist.name).join(", ")} image={{ uri: item.thumbnail.contents[0].url }} />)}
        </ScrollView>
      </Container>
    </>
  )
}

export default PlaylistPage

const styles = StyleSheet.create({
  img: {
    borderRadius: cfs(4),
    marginVertical: cfs(30),
    height: cfs(220),
    width: cfs(220)
  }
})