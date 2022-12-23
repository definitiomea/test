import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: 0,
  userlist: [
    // 임시데이터
    {
      id: "abc123",
      name: "아바라",
      password: "12345",
      email: "dddd@dddd",
      address: null,
      zoneCode: null,
      detailAddress: null,
      reference: null,
    },
  ],
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    SIGN_UP: (state, action) => {
      const newUser = {
        id: action.payload.id,
        name: action.payload.name,
        password: action.payload.password,
        email: action.payload.email,
        address: action.payload.address,
        zoneCode: action.payload.zoneCode,
        detailAddress: action.payload.detailAddress,
        reference: action.payload.reference,
      };
      const newUserlist = state.userlist.concat(newUser);
      state.userlist = newUserlist;
    },

    ADDIT_USER: (state, action) => {
      state.userlist = state.userlist.map((user) => {
        return action.payload.id === user.id ? action.payload : user;
      });
    },
  },
});

export const { SIGN_UP, ADDIT_USER, ADDIT_ADDRESS } = signupSlice.actions;

export default signupSlice.reducer;
