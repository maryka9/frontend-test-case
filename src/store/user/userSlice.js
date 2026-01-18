import { createSlice } from "@reduxjs/toolkit";
import {fetchUser} from "../api/thunks";
import {RequestStatus} from "@constants";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: RequestStatus.Idle
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = RequestStatus.Pending;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = RequestStatus.Fulfilled;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = RequestStatus.Rejected;
                state.error = "Ошибка загрузки пользователя";
            });
    }
});

export default userSlice.reducer;