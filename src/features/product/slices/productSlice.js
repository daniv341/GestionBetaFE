import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  status: "idle",
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.product = null;
      });
  },
});

export default productSlice.reducer;
