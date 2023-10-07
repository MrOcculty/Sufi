import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchSearchedArtists = createAsyncThunk("fetchSearchedArtists", async (query, type) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}&type=artist`)
    console.log(response)
    return response.data
})

const searchedArtistsSlice = createSlice({
    name: "searchedArtists",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedArtists.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSearchedArtists.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchSearchedArtists.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default searchedArtistsSlice.reducer