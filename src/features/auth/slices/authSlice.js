import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: JSON.parse(sessionStorage.getItem("usuarioLogueado")) || null,
  status: 'idle', 
};

const authSlice = createSlice({
  name: "auth",
    initialState,
    reducers: { 
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            sessionStorage.removeItem("usuarioLogueado");
        }
     }, 
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending , (state) => {
          state.status = 'loading';

    })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isAuthenticated = true;
            state.user = action.payload;
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(action.payload));
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = 'failed';
            state.isAuthenticated = false;
            state.user = null;
        });
    },
});

export default authSlice.reducer;
