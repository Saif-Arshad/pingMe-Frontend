import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";


interface InitialState {
    currentUser: any;
    allUsers: any;
    AiChat: any;
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
    AiChat: [],
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




                const roomExists = state.currentUser.roomHistory.some((room: any) => room.roomId === payload.roomId);

                if (!roomExists) {
                    state.currentUser.roomHistory.push(payload);
                }
            }

        },
        newMessage: (state: any, action: any) => {

            const currnetRoom = [action.payload.sender, action.payload.receiver].sort().join('-');
            const getRoomMessages = state.currentUser && state.currentUser.roomHistory.filter((item: any) => item.roomId === currnetRoom)[0];
            if (getRoomMessages) {
                getRoomMessages.messages.push(action.payload);
            }
        },
        deleteRoom: (state: any, action: any) => {
            state.currentUser.roomHistory = state.currentUser.roomHistory.filter(
                (item: any) => item.roomId !== action.payload.roomId
            );
            state.currentUser.blockList = state.currentUser.blockList.filter((id: any) => id !== action.payload.id);


        },
        blockUsers: (state: any, action: any) => {

            if (!state.currentUser.blockList) {
                state.currentUser.blockList = [];
            }

            // Avoid adding duplicates
            if (!state.currentUser.blockList.includes(action.payload)) {
                state.currentUser.blockList.push(action.payload);
            } else {
                console.error("User is already in the blockList.");
            }
        },
        blocked: (state: any, action: any) => {
            const { currentUserId, userId } = action.payload;

            const currentUser = state.allUsers.find((user: any) => user._id === currentUserId);

            if (currentUser) {
                if (!currentUser.blockList) {
                    currentUser.blockList = [];
                }

                if (!currentUser.blockList.includes(userId)) {
                    currentUser.blockList.push(userId);
                    toast.success(`User ${userId} has been blocked.`);
                } else {
                    console.log("User is already in the blockList.");
                }
            } else {
                console.error("Current user not found.");
            }
        },
        unBlocked: (state: any, action: any) => {
            const { currentUserId, userId } = action.payload;

            const currentUser = state.allUsers.find((user: any) => user._id === currentUserId);

            if (currentUser) {
                if (currentUser.blockList) {
                    currentUser.blockList = currentUser.blockList.filter((blockedId: string) => blockedId !== userId);
                } else {
                    console.log("User has no blockList.");
                }
            } else {
                console.error("Current user not found.");
            }
        },



        unBlockUsers: (state: any, action: any) => {

            state.currentUser.blockList = state.currentUser.blockList.filter((id: any) => id !== action.payload);
        },

        archiveUsers: (state: any, action: any) => {
            if (!state.currentUser.archiveUser) {
                state.currentUser.archiveUser = [];
            }

            // Avoid adding duplicates
            if (!state.currentUser.archiveUser.includes(action.payload)) {
                state.currentUser.archiveUser.push(action.payload);
            } else {
                console.log("User is already in the archive.");
            }
        },
        unArchiveMessages: (state: any, action: any) => {
            state.currentUser.archiveUser = state.currentUser.archiveUser.filter((id: any) => id !== action.payload);
        },
        readMessage: (state: any, action: any) => {
            const { sender, receiver } = action.payload;
            const roomId = [sender, receiver].sort().join('-');

            const room = state.currentUser.roomHistory.find((room: any) => room.roomId === roomId);

            if (room) {
                room.messages = room.messages.map((message: any) => ({
                    ...message,
                    isRead: true,
                }));
            }
        },

        updateProfile: (state: any, action: any) => {
            // Extract relevant fields from the payload
            const { profileImage, bannerImage, profileName } = action.payload.data;
            // Update the current user's profile details
            if (state.currentUser) {
                state.currentUser.profileImage = profileImage;
                state.currentUser.bannerImage = bannerImage;
                state.currentUser.profileName = profileName;
            }

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

export const { joinRoom, unBlockUsers, blocked, unBlocked, unArchiveMessages, readMessage, updateProfile, newMessage, archiveUsers, deleteRoom, blockUsers } = getUser.actions;

export default getUser.reducer;