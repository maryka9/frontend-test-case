import { createSlice } from "@reduxjs/toolkit";
import {checkoutCart} from "@store/api/thunks";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const idToRemove = action.payload;

            state.items = state.items.filter(item => item.id !== idToRemove);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = quantity;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkoutCart.fulfilled, (state) => {
            state.items = [];
        });
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
