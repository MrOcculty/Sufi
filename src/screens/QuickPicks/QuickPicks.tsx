import React, { useEffect } from 'react'
import Container from '../../components/Container'
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import cfs from '../../utils/fontUtils'
import ItemTab from '../Songs/ItemTab'
import AlbumsNPlaylists from './AlbumsNPlaylists'
import { fetchQuickPicks } from '../../redux_toolkit/slices/quickPicksSlice'
import { useDispatch, useSelector } from 'react-redux'

const QuickPicks = () => {
    const currentSong = useSelector(state => state.currentSong)
    const dispatch = useDispatch()
    const quickPicks = useSelector(state => state.quickPicks)

    useEffect(() => {
        dispatch(fetchQuickPicks())
    }, [])

    return (
        <>
            <Container heading='Quick picks' navbar="true">
                <ScrollView style={{
                    height: Dimensions.get('window').height - (currentSong.data ? cfs(235) : cfs(165)),
                    marginLeft: cfs(20)
                }}>
                    {quickPicks.data?.map(section => {
                        if (section.contents[0].item_type === "song" || section.contents[0].item_type === "video")
                            return (
                                <View key={"QP" + section.header?.title?.text}>
                                    {/* {
                                        quickPicks.data?.indexOf(section) !== 0 &&
                                        <Text style={[styles.heading, styles.contentBox]}>
                                            {section.header.title.text}
                                        </Text>
                                    } */}
                                    {
                                        quickPicks.data?.indexOf(section) === 0 && < ScrollView nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} decelerationRate={0.4} snapToInterval={cfs(355)} >
                                            <View style={styles.pops}>
                                                {
                                                    section.contents?.map(content => <View key={content.id} style={styles.popsChilds}>
                                                        <ItemTab from="song" index={0} id={content.id} name={content.title} singer={content.artists?.map((artist) => artist.name).join(", ") || content.overlay?.content?.pause_label?.split('-')[1].trim()} image={{ uri: content.thumbnail.contents[0].url }} />
                                                    </View>
                                                    )
                                                }
                                            </View>
                                        </ScrollView>}
                                </View>)
                        return (<View key={"QP" + section.header?.title?.text
                        }>
                            <Text style={[styles.heading, styles.contentBox]}>
                                {section.header.title.text}
                            </Text>
                            <ScrollView nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.artists}>
                                    {
                                        section.contents.map(content => <View key={content.id} style={styles.popsChilds}>
                                            <AlbumsNPlaylists id={content.id} type={content.item_type} title={content.title?.text} subtitle={content.item_type === "artist" ? content.subtitle?.text : content.subtitle?.runs?.[2]?.text} image={{ uri: content.thumbnail?.[0]?.url }} />
                                        </View>
                                        )
                                    }
                                </View>
                            </ScrollView>
                        </View>)
                    })}
                </ScrollView >
            </Container >
        </>
    )
}

export default QuickPicks

const styles = StyleSheet.create({
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