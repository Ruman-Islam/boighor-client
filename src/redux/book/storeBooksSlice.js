import { createSlice } from "@reduxjs/toolkit";

const storeBooksSlice = createSlice({
    name: "navbarSlice",
    initialState: {
        searchedBooks: [],
    },

    reducers: {
        storeSearchedBooks: (state, action) => {
            state.searchedBooks = action.payload;
        },

        clearSearchedBooks: (state, action) => {
            state.searchedBooks = [];
        },
    }
})

export const {
    storeSearchedBooks,
    clearSearchedBooks,
} = storeBooksSlice.actions;

export default storeBooksSlice.reducer;