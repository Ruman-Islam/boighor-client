import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../api/axios";

export const fetchRelatedBooks = createAsyncThunk("relatedBooksSlice/fetchRelatedBooks", async (query) => {
    const { data } = await fetcher.get(`book/category?query=${query}`)
    return data.result;
});

const relatedBooksSlice = createSlice({
    name: "relatedBooksSlice",
    initialState: {
        isLoading: false,
        relatedBooks: [],
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchRelatedBooks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRelatedBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.relatedBooks = action.payload;
            state.error = null;
        });
        builder.addCase(fetchRelatedBooks.rejected, (state, action) => {
            state.isLoading = false;
            state.relatedBooks = [];
            state.error = action.error.message;
        });
    },
});

export default relatedBooksSlice.reducer;