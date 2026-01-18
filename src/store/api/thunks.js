import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/products.json");

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!response.ok) {
                return rejectWithValue("error");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || "Что-то пошло не так");
        }
    }
);

export const fetchUser = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/user.json");

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!response.ok) {
                return rejectWithValue("error");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || "Что-то пошло не так");
        }
    }
);