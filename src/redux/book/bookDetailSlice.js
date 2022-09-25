import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../api/axios";

export const fetchABook = createAsyncThunk("bookDetailSlice/fetchABook", async (id) => {
    const { data } = await fetcher.get(`book/get-one/${id}`)
    return data.result;
});

const bookDetailSlice = createSlice({
    name: "bookDetailSlice",
    initialState: {
        isLoading: false,
        book: {},
        rating: 0,
        totalRatings: 0,
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchABook.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchABook.fulfilled, (state, action) => {
            state.isLoading = false;


            let total = action.payload?.ratings?.map(rt => {
                let total = 0;
                return total += rt.star * rt.count
            });
            let total2 = action.payload?.ratings?.map(rt => {
                let total = 0;
                return total += rt.count
            });
            const count1 = total.reduce((a, b) => a + b, 0);
            const count2 = total2.reduce((a, b) => a + b, 0);
            state.rating = +(count1 / count2).toFixed(1);


            state.totalRatings = action.payload?.ratings?.reduce((a, b) => a + b.count, 0);

            state.book = action.payload;
            state.error = null;
        });
        builder.addCase(fetchABook.rejected, (state, action) => {
            state.isLoading = false;
            state.rating = 0;
            state.book = {};
            state.error = action.error.message;
        });
    },
});

export default bookDetailSlice.reducer;