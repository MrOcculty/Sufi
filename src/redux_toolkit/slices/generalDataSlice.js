import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    heading: "",
    searchQuery: "",
    bgColor: "rgb(27, 18, 18)",
    isLoading: false,
    error: null
}

const generalDataSlice = createSlice({
    name: "generalData",
    initialState,
    reducers: {
        setHeading: (state, action) => {
            state.heading = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        removeSearchQuery: (state, action) => {
            state.searchQuery = ""
        },
        setBgColor: (state, action) => {
            state.bgColor = action.payload
        }
    },

})

export default generalDataSlice.reducer
export const { setHeading, setSearchQuery, setBgColor, removeSearchQuery } = generalDataSlice.actions