import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "", email: "", address: "", isLoggedIn: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.address = initialState.address;
      state.isLoggedIn = initialState.isLoggedIn;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
