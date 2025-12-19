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
    
      if (Array.isArray(response.data)) {
        return response.data;
      }
   
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
  async (productWithUser, { rejectWithValue }) => {
    try {
      const { user, ...product } = productWithUser;
      
    
      const productData = {
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio_venta: parseFloat(product.precio_venta),
        precio_compra: parseFloat(product.precio_compra),
        categoria: product.categoria,
        SKU: product.SKU || null,
        stock_actual: parseInt(product.stock_actual),
        stock_minimo: parseInt(product.stock_minimo),
        enable: product.enable !== false,
        usuarioId: user?.id,
      };

      console.log("Enviando producto:", productData);
      console.log("Token en header:", axios.defaults.headers.common["Authorization"]);
      console.log("Usuario ID:", user?.id);
      const response = await axios.post(URL_CREATE_PRODUCT, productData);
      console.log("Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creando producto:", error.response?.data || error.message);
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
