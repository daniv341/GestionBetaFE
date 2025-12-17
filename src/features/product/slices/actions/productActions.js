import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PRODUCTS = import.meta.env.VITE_API_PRODUCTS;
const URL_PRODUCT = import.meta.env.VITE_API_PRODUCT;
const URL_CREATE_PRODUCT = import.meta.env.VITE_API_CREATE_PRODUCT;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL_PRODUCTS);
      // Si la respuesta es un array, retórnalo
      if (Array.isArray(response.data)) {
        return response.data;
      }
      // Si está envuelto en un objeto, busca la propiedad con los datos
      return response.data.data || response.data.productos || response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL_PRODUCT}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL_CREATE_PRODUCT, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL_PRODUCT}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL_PRODUCT}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
