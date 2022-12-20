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
    ADD_IMG(state, action) {
      state.reviewImg = action.payload.reviewImg;
    },
    ADD_STAR(state, action) {
      state.reviewStar = action.payload.reviewStar;
    },
    ADD_CONTENT(state, action) {
      state.reviewContent = action.payload.reviewContent;
    },
  },
});

export const { ADD_IMG, ADD_STAR, ADD_CONTENT } = reviewSlice.actions;
export default reviewSlice.reducer;
