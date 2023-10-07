import { configureStore } from '@reduxjs/toolkit'
import quickPicksReducer from './slices/quickPicksSlice'
import currentSongReducer from './slices/currentSongSlice'
import generalDataReducer from './slices/generalDataSlice'
import searchedSongsReducer from './slices/searchedSongsSlice'
import searchedAlbumsReducer from './slices/searchedAlbumsSlice'
import searchedArtistsReducer from './slices/searchedArtistsSlice'
import searchedPlaylistsReducer from './slices/searchedPlaylistsSlice'
import playlistSlice from './slices/playlistSlice'
import albumSlice from './slices/albumSlice'
import artistSlice from './slices/artistSlice'
import enqueuedSlice from './slices/enqueuedSlice'

const store = configureStore({
    reducer: {
        quickPicks: quickPicksReducer,
        currentSong: currentSongReducer,
        generalData: generalDataReducer,
        searchedSongs: searchedSongsReducer,
        searchedAlbums: searchedAlbumsReducer,
        searchedArtists: searchedArtistsReducer,
        searchedPlaylists: searchedPlaylistsReducer,
        playlist: playlistSlice,
        album: albumSlice,
        artist: artistSlice,
        currentQueue: enqueuedSlice
    }
})

export default store