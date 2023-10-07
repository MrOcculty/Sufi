import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchArtist = createAsyncThunk("fetchArtist", async (id) => {
    const response = await axios.get(`${BASE_URL}/getartist?id=${id}`)
    console.log(response)
    return response.data
})

const artistSlice = createSlice({
    name: "artist",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchArtist.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchArtist.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchArtist.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default artistSlice.reducer