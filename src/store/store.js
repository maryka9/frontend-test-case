import { configureStore } from '@reduxjs/toolkit';
import {productsReducer} from './products';
import {cartReducer} from './cart';
import {userReducer} from './user';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        user: userReducer
    }
});