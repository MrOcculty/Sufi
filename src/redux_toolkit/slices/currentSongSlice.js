import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "@env"

const initialState = {
    currentTime: 0,
    currentIndex: null,
    isLoading: false,
    data: null,
    error: null,
    isPlaying: false,
}

export const fetchCurrentSong = createAsyncThunk("fetchCurrentSong", async (id) => {
    const response = await axios.get(`${BASE_URL}/getinfo?id=${id}`)
    console.log(response.data)
    return response.data
})

const currentSongSlice = createSlice({
    name: "currentSong",
    initialState,
    reducers: {
        toggleIsPlaying: (state,) => {
            if (state.data) state.isPlaying = !state.isPlaying
        },
        removeCurrentSong: (state, action) => {
            state.currentTime = 0
            state.data = null
            state.isPlaying = false
            state.currentIndex = null
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentSong.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchCurrentSong.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCurrentSong.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default currentSongSlice.reducer
export const { setCurrentTime, toggleIsPlaying, removeCurrentSong, setCurrentIndex } = currentSongSlice.actions