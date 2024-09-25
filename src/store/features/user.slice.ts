import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";


const initialState = {
    currentUser: null,
    isLoading: true,
    isError: false,
    error: null,
};

export const getCurrentUser = createAsyncThunk("gettigUser", async (token, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.post(`/api/me`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
const getUser = createSlice({
    name: 'gettingCurrentUser',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.currentUser = action.payload && action.payload.data.user;
        });

        builder.addCase(getCurrentUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error
        });

    },
});

export default getUser.reducer;