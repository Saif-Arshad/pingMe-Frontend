import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";


interface InitialState {
    currentUser: any;
    allUsers: any;
    isLoading: boolean;
    currentUserId: any,
    isError: boolean;
    error: string | null;
}
interface JoinRoomPayload {
    messages: any[];
    participants: string[];
    roomId: string;
}

const initialState: InitialState = {
    currentUser: null,
    allUsers: [],
    currentUserId: null,
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
export const getAllUsers = createAsyncThunk("getAllUsers", async (token, { rejectWithValue }: any) => {
    try {
        const response = await axiosInstance.get(`/api/users/all-users`,
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
        joinRoom: (state: any, action: PayloadAction<JoinRoomPayload>) => {

            if (state.currentUser && state.currentUser.roomHistory) {
                const payload = action.payload;
                console.log("🚀 ~ payload:", payload)




                const roomExists = state.currentUser.roomHistory.some((room: any) => room.roomId === payload.roomId);

                if (!roomExists) {
                    state.currentUser.roomHistory.push(payload);
                }
            }

            console.log(state.currentUser);
        },
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
            state.currentUserId = action.payload && action.payload.data.user._id;
        });

        builder.addCase(getCurrentUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error
        });
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.allUsers = action.payload && action.payload.data.data;
        });

        builder.addCase(getAllUsers.rejected, (state, action: any) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error
        });

    },
});

export const { joinRoom } = getUser.actions;

export default getUser.reducer;