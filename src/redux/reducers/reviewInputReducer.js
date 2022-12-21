import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewID: 0,
  reviewInput: {
    userID: "",
    img: "",
    category: "",
    productName: "",
    size: "",
    comment: "",
    date: "",
  },
};

const reviewSlice = createSlice({
  name: "reviewInput",
  initialState,
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        // 리뷰 첨부 이미지 불러오기
        imgArray: action.payload.img,
        // 고객 로그인 아이디 가져오기
        userID: action.payload.userID,
        // 리뷰 별점 가져오기
        // star:,
        // 제품 종류 불러오기
        category: action.payload.category,
        // 제품 스타일 불러오기
        productName: action.payload.productName,
        // 사이즈 불러오기
        size: action.payload.size,
        // // 리뷰 작성내용 불러오기
        // comment:,
        // // 작성 날짜 불러오기
        // date:,
      };
      const newReviewlist = state.reviewInput.concat(addReview);
      state.reviewInput = newReviewlist;
    },
    deleteReview: (state, action) => {
      // reviewInput배열에서 reiviewID가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
      const newReviewlist = state.reviewInput.filter((review) => review.reviewID != action.payload);
    },
  },

  // reducers: {
  //   ADD_IMG(state, action) {
  //     state.reviewImg = action.payload.reviewImg;
  //   },
  //   ADD_STAR(state, action) {
  //     state.reviewStar = action.payload.reviewStar;
  //   },
  //   ADD_CONTENT(state, action) {
  //     state.reviewContent = action.payload.reviewContent;
  //   },
  // },
});

export const { addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
