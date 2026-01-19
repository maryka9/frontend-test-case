import { createSlice } from "@reduxjs/toolkit";
import {fetchProducts} from "@store/api/thunks";
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
            .addCase(fetchProducts.rejected, (state) => {
                state.status = RequestStatus.Rejected;
                state.error = "Не удалось загрузить товары";
            });
    }
});

export default productSlice.reducer;
