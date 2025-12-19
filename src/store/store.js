import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/slices/authSlice.js";
import productSlice from "../features/product/slices/productSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});