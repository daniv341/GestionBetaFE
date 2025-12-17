import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchProducts, 
  fetchProduct, 
  createProduct, 
  deleteProduct, 
  updateProduct 
} from "./actions/productActions.js";

const initialState = {
  product: null,
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.products = [];
      });

    // fetchProduct
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // createProduct
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // deleteProduct
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(p => p.id !== action.meta.arg);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // updateProduct
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
