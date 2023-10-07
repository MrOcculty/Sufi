import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@env"

export const addRelated = createAsyncThunk("addRelated", async (id) => {
    const related = await axios.get(`${BASE_URL}/getrelated?id=${id}`)
    console.log(related)
    return related.data.contents
})

const initialState = {
    queue: [],
    error: null,
    isLoading: false

}

const queueSlice = createSlice({
    name: "enqueuedSongs",
    initialState,
    reducers: {
        addSongsToQueue: (state, action) => {
            state.queue = [...state.queue, ...action.payload]
            console.log(state)
        },
        emptyQueue: (state) => {
            state.queue = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addRelated.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addRelated.fulfilled, (state, action) => {
            console.log("Success: " + action.payload)
            state.isLoading = false
            state.queue = action.payload
        })
        builder.addCase(addRelated.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log("Error: " + action.payload)
        })
    }
})

export const { addSongsToQueue, emptyQueue } = queueSlice.actions
export default queueSlice.reducer