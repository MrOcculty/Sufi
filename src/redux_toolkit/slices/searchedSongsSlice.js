import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchSearchedSongs = createAsyncThunk("fetchSearchedSongs", async (query) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}&type=song`)
    console.log(response)
    return response.data
})

const searchedSongsSlice = createSlice({
    name: "searchedSongs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedSongs.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSearchedSongs.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchSearchedSongs.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default searchedSongsSlice.reducer