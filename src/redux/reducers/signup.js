import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userlist: [],
};

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
        zoneCode: action.payload.zoneCode,
        detailAddress: action.payload.detailAddress,
        reference: action.payload.reference,
      };
      const newUserlist = state.userlist.concat(newUser);
      state.userlist = newUserlist;
      console.log(state.userlist);
    },

    ADDIT_USER: (state, action) => {
      state.userlist = state.userlist.map((user) => {
        if (action.payload.id === user.id) {
          return action.payload;
        } else {
          return user;
        }
      });
    },
  },
});

export const { SIGN_UP, ADDIT_USER } = signupSlice.actions;

export default signupSlice.reducer;
