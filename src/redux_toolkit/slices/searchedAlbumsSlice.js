import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchSearchedAlbums = createAsyncThunk("fetchSearchedAlbums", async (query) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}&type=album`)
    console.log(response)
    return response.data
})

const searchedAlbumsSlice = createSlice({
    name: "searchedAlbums",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedAlbums.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSearchedAlbums.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchSearchedAlbums.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default searchedAlbumsSlice.reducer