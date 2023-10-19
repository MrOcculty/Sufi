import { Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import cfs from '../utils/fontUtils'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../redux_toolkit/slices/generalDataSlice'
import axios from 'axios'
import { fetchSearchedSongs } from '../redux_toolkit/slices/searchedSongsSlice'
import { fetchSearchedAlbums } from '../redux_toolkit/slices/searchedAlbumsSlice'
import { fetchSearchedArtists } from '../redux_toolkit/slices/searchedArtistsSlice'
import { fetchSearchedPlaylists } from '../redux_toolkit/slices/searchedPlaylistsSlice'

const Header = ({ heading }) => {

  const dispatch = useDispatch()
  const query = useSelector(state => state.generalData.searchQuery)

  const fetchData = () => {
    heading === 'Songs' ? dispatch(fetchSearchedSongs(query)) : heading === 'Albums' ? dispatch(fetchSearchedAlbums(query)) : heading === 'Artists' ? dispatch(fetchSearchedArtists(query)) : dispatch(fetchSearchedPlaylists(query))
  }

  const handleChange = async (text) => {
    dispatch(setSearchQuery(text))
    try {
      const suggestions = await axios.get(`http://10.0.2.2:5000/getsuggestions?q=${text}`)
      console.log(suggestions)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Image
          source={require('../assets/icons/SettingsIcon.png')}
          style={styles.settingsIcon}
        />
        <View style={[styles.rightView, { width: heading === 'Songs' || heading === 'Albums' || heading === 'Artists' || heading === 'Playlists' && cfs(200) }]}>
          {!(heading === 'Songs' || heading === 'Albums' || heading === 'Artists' || heading === 'Playlists') ?
            <Text numberOfLines={1} style={styles.rightText}>
              {heading}
            </Text> :
            <TextInput
              numberOfLines={1}
              value={query && query}
              style={styles.rightText}
              textAlign='right'
              inputMode='text'
              editable
              placeholder="Search here..."
              placeholderTextColor='rgba(255, 255, 255,0.3)'
              onSubmitEditing={fetchData}
              onChangeText={handleChange}
            />}
        </View>
      </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    paddingTop: cfs(80),
    paddingBottom: cfs(20),
    paddingHorizontal: cfs(20),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: cfs(100)
  },
  settingsIcon: {
    opacity: 0.5,
    height: cfs(28),
    width: cfs(28),
    padding: cfs(7.5),
  },
  rightView: {
    height: cfs(60)
  },
  rightText: {
    marginLeft: cfs(20),
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: cfs(35),
    paddingHorizontal: cfs(2)
  }
})