import { createAsyncThunk } from "@reduxjs/toolkit";
const URL_PRODUCTS = import.meta.env.VITE_API_PRODUCTS;
const URL_PRODUCT = import.meta.env.VITE_API_PRODUCT;
const URL_CREATE_PRODUCT = import.meta.env.VITE_API_CREATE_PRODUCT;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(URL_PRODUCTS);

    return await response.json();
  }
);
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await fetch(`${URL_PRODUCT}/${id}`);
    return await response.json();
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      const response = await fetch(`${URL_CREATE_PRODUCT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!data.success) throw data.error;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const response = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }) => {
    const response = await fetch(`${URL_PRODUCT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);
