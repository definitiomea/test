import { createSlice } from "@reduxjs/toolkit";

const initialState = { userlist: [] };

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    SIGN_UP: (state, action) => {
      const newUser = {
        name: action.payload.name,
        id: action.payload.id,
        password: action.payload.password,
        email: action.payload.email,
        address: action.payload.address,
      };
      const newUserlist = state.userlist.concat(newUser);
      state.userlist = newUserlist;
      console.log(state.userlist);
    },
  },
});

export const { SIGN_UP } = signupSlice.actions;

export default signupSlice.reducer;