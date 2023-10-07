import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "@env"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

export const fetchQuickPicks = createAsyncThunk("fetchQuickPicks", async (query, type) => {
    const response = await axios.get(`${BASE_URL}/gethomefeed`)
    console.log(response)
    return response.data
})

const quickPicksSlice = createSlice({
    name: "quickPicks",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuickPicks.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchQuickPicks.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchQuickPicks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export default quickPicksSlice.reducer