import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.password = action.payload.password;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      state.name = initialState.name;
      state.id = initialState.id;
      state.email = initialState.email;
      state.address = initialState.address;
      state.password = initialState.password;
      state.isLoggedIn = initialState.isLoggedIn;
    },
  },
});

export const { loginUser, logout } = userSlice.actions;

export default userSlice.reducer;
