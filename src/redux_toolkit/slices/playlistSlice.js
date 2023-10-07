import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchPlaylist = createAsyncThunk("fetchPlaylist", async (id) => {
    const response = await axios.get(`${BASE_URL}/getplaylist?id=${id}`)
    console.log(response)
    return response.data
})

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylist.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchPlaylist.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default playlistSlice.reducer