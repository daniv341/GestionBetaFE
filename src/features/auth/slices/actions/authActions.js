const URL_API_LOGIN = import.meta.env.VITE_API_LOGIN_URL;

import { createAsyncThunk } from "@reduxjs/toolkit";    

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => { 
        try { 
            const response = await fetch(URL_API_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }).then(res => res.json());
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export { loginUser };