import { createSlice } from "@reduxjs/toolkit";
import {fetchUser} from "@store/api/thunks";
import {RequestStatus} from "@constants";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: RequestStatus.Idle,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = RequestStatus.Pending;
                state.user = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = RequestStatus.Fulfilled;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = RequestStatus.Rejected;
                state.user = null;
                state.error = "Ошибка загрузки пользователя";
            });
    }
});

export default userSlice.reducer;