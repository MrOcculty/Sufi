import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from '../Songs/ItemTab'
import { useDispatch, useSelector } from 'react-redux'

const AlbumPage = () => {
  const albumData = useSelector(state => state.album)
  const currentSong = useSelector(state => state.currentSong)
  const currentQueue = useSelector(state => state.currentQueue)
  const dispatch = useDispatch()

  return (
    <>
      <Container heading={albumData.data?.header?.title?.text} navbar={false} >
        <ScrollView style={{
          height: Dimensions.get('window').height - (currentSong.data ? cfs(170) : cfs(100)),
          marginLeft: cfs(20)
        }}>
          <Image
            source={{ uri: albumData.data?.header?.thumbnails?.[1]?.url }}
            style={styles.img}
          />
          {
            albumData.data?.contents?.map((song, index) =>
              <ItemTab
                key={song.id}
                from="album"
                index={index}
                id={song.id}
                name={song.title}
                singer={song.overlay?.content?.pause_label?.split('-')[1].trim()}
                image={{ uri: albumData.data?.header?.thumbnails?.[3]?.url }}
              />)
          }
        </ScrollView>
      </Container>
    </>
  )
}

export default AlbumPage

const styles = StyleSheet.create({
  img: {
    borderRadius: cfs(4),
    marginVertical: cfs(30),
    height: cfs(220),
    width: cfs(220)
  }
})