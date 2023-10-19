import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from '../Songs/ItemTab'
import AlbumsNPlaylists from '../QuickPicks/AlbumsNPlaylists'
import { useSelector } from 'react-redux'

const ArtistPage = () => {
  const artistData = useSelector(state => state.artist)
  const currentSong = useSelector(state => state.currentSong)
  return (
    <>
      <Container heading={artistData.data?.header.title.text} navbar={false} >
        <ScrollView style={{
          height: Dimensions.get('window').height - (currentSong.data ? cfs(170) : cfs(100)),
          marginLeft: cfs(20)
        }}>
          <Image
            source={{ uri: artistData.data?.header?.thumbnail?.contents?.[1]?.url }}
            style={styles.img}
          />
          {artistData.data?.sections.map(section => {
            if (section.contents[0].item_type === "song") return (<View key={section.header?.title?.text}>
              <Text style={[styles.heading, styles.contentBox]}>
                {section.title?.text}
              </Text>
              <ScrollView nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} decelerationRate={0.4} snapToInterval={cfs(355)}>
                <View style={styles.pops}>
                  {
                    section.contents.map(content => <View key={content.id} style={styles.popsChilds}>
                      <ItemTab id={content.id} from="artist" index={0} name={content.title} singer={content.artists.map((artist) => artist.name).join(", ") || content.overlay?.content?.pause_label?.split('- ')[1]} image={{ uri: content.thumbnail.contents[0].url }} />
                    </View>
                    )
                  }
                </View>
              </ScrollView>
            </View>)
            return section.header.title.text !== "Videos" && (<View key={section.header?.title?.text}>
              <Text style={[styles.heading, styles.contentBox]}>
                {section.header.title.text}
              </Text>
              <ScrollView nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.artists}>
                  {
                    section.contents.map(content => <View key={content.id} style={styles.popsChilds}>
                      <AlbumsNPlaylists key={content.id} id={content.id} type={content.item_type} title={content.title.text} subtitle={content.item_type === "artist" ? content.subtitle.text : content.subtitle.runs?.[2]?.text} image={{ uri: content.thumbnail[0].url }} />
                    </View>
                    )
                  }
                </View>
              </ScrollView>
            </View>)
          })}
        </ScrollView>
      </Container>
    </>
  )
}

export default ArtistPage

const styles = StyleSheet.create({
  img: {
    // borderRadius: cfs(110),
    marginVertical: cfs(30),
    height: cfs(220),
    width: cfs(320)
  },


  heading: {
    paddingBottom: cfs(10),
    fontSize: cfs(25),
    fontWeight: "bold",
    color: 'white',
    opacity: 0.8
  },
  contentBox: {
    marginTop: cfs(20)
  },
  pops: {
    height: cfs(260),
    flex: 1,
    gap: cfs(15),
    flexWrap: "wrap",
  },
  artists: {

    flexDirection: "row",
    gap: cfs(35),
    flexWrap: "wrap",
  },
  albums: {
    height: cfs(180),
    flex: 1,
    flexDirection: "row",
    gap: cfs(35),
    flexWrap: "wrap",
  },
  popsChilds: {
    flexBasis: cfs(50),
  }
})