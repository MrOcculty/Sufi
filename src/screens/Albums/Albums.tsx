import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import cfs from '../../utils/fontUtils'
import ItemTab from './ItemTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchedAlbums } from '../../redux_toolkit/slices/searchedAlbumsSlice'

const Albums = () => {

    const dispatch = useDispatch()
    const query = useSelector(state => state.generalData.searchQuery)
    const searchedAlbums = useSelector(state => state.searchedAlbums)
    const currentSong = useSelector(state => state.currentSong)
    useEffect(() => {
        if (query) {
            !searchedAlbums.data && dispatch(fetchSearchedAlbums(query))
        }
    }, [])

    return (
        <>
            <Container heading='Albums' navbar="true" >
                <ScrollView style={{
                    height: Dimensions.get('window').height - (currentSong.data ? cfs(235) : cfs(165)),
                    marginLeft: cfs(20)
                }}>
                    {searchedAlbums.data?.contents?.map(content => <View key={content.title?.text}>
                        {content.title && content.contents?.map(album => <ItemTab key={album.id} id={album.id} name={album.title} by={album.author?.name} year={album.year} image={{
                            uri: album.thumbnail?.contents?.[2]?.url
                        }} />)
                        }</View>)}
                </ScrollView >
            </Container>
        </>
    )
}

export default Albums

const styles = StyleSheet.create({
    quickPickContainer: {
        height: Dimensions.get('window').height - cfs(165),
        marginLeft: cfs(20)
    },
})