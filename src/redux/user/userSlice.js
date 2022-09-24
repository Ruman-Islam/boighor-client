import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAUser = createAsyncThunk("userSlice/fetchAUser", async (email) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/user//user-info?email=${email}`)
    return data.result;
});

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isLoading: false,
        user: {},
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchAUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;