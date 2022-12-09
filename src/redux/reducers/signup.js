import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id: "", password: "", email: "", address: "" };

export const signupSlice = createSlice({
  name: "signup",
  initialState: { value: initialStateValue },
  reducers: {
    SIGN_UP: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SIGN_UP } = signupSlice.actions;

export default signupSlice.reducer;
