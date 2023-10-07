import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchSearchedPlaylists = createAsyncThunk("fetchSearchedPlaylists", async (query, type) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}&type=playlist`)
    console.log(response)
    return response.data
})

const searchedPlaylistsSlice = createSlice({
    name: "searchedPlaylists",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedPlaylists.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSearchedPlaylists.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchSearchedPlaylists.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default searchedPlaylistsSlice.reducer