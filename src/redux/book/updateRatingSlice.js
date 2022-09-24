import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUpdateRating = createAsyncThunk("ratingUpdateSlice/fetchUpdateRating", async (query) => {
    const { id } = query;
    const { rating } = query;
    const url = `https://boighor-server.vercel.app/api/v1/book/update_book_rating?id=${id}&rating=${rating}`
    const { data } = await axios.patch(url)
    return data.result;
});


const ratingUpdateSlice = createSlice({
    name: "ratingUpdateSlice",
    initialState: {
        isLoading: false,
        rating: 0,
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUpdateRating.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdateRating.fulfilled, (state, action) => {
            state.isLoading = false;
            state.rating = action.payload;
            state.error = null;
        });
        builder.addCase(fetchUpdateRating.rejected, (state, action) => {
            state.isLoading = false;
            state.rating = 0;
            state.error = action.error.message;
        });
    },
});

export default ratingUpdateSlice.reducer;