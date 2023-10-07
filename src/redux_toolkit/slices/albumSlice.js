import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchAlbum = createAsyncThunk("fetchAlbum", async (id) => {
    const response = await axios.get(`${BASE_URL}/getalbum?id=${id}`)
    console.log(response)
    return response.data
})

const albumSlice = createSlice({
    name: "album",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAlbum.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchAlbum.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchAlbum.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default albumSlice.reducer