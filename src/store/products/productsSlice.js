import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchProducts} from "../api/thunks";
import {RequestStatus} from "@constants";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: RequestStatus.Idle,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = RequestStatus.Pending;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = RequestStatus.Fulfilled;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = RequestStatus.Rejected;
                state.error = "Не удалось загрузить товары";
            });
    }
});

export default productSlice.reducer;
