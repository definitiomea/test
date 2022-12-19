import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewStar: null,
  reviewContent: null,
  reviewImg: null,
};

export const reviewSlice = createSlice({
  name: "reviewInput",
  initialState,
  reducers: {
    ADD_STAR(state, action) {
      state.reviewStar = action.payload.reviewStar;
    },
    ADD_CONTENT(state, action) {
      state.reviewContent = action.payload.reviewContent;
    },
    ADD_IMG(state, action) {
      state.reviewImg = action.payload.reviewImg;
    },
  },
});

export const reviewInputActions = reviewSlice.actions;
export default reviewSlice.reducer;
