// 네브바에서의 로그인을 위한 리듀서
import { createSlice } from "@reduxjs/toolkit";

let user = {
  name: "고객명",
};

const userSlice = createSlice({
  name: "user",
  initialState: user,
  user,
  reducers: {
    setUser(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
