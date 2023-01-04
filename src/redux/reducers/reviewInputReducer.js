import { createSlice } from "@reduxjs/toolkit";

// 주문 날짜
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const today = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${today}`;
};

const initialState = {
  reviewID: 0,
  reviewlist: [],
};

const reviewSlice = createSlice({
  name: "reviewlist",
  initialState,
  reducers: {
    inputReview: (state, action) => {
      // console.log(action.payload.date);
      const newReview = {
        reviewID: state.reviewID,
        // 상품ID 불러오기
        productID: action.payload.productID,
        // 리뷰 첨부 이미지 불러오기
        img: action.payload.img,
        // 이미지를 첨부하지 않았을 때 상품의 썸네일을 출력하기 위함
        thumbnail: action.payload.thumbnail,
        // 고객 로그인 아이디 가져오기
        userID: action.payload.userID,
        // 리뷰 별점 가져오기
        star: action.payload.star,
        // 제품 종류 불러오기
        category: action.payload.category,
        // 제품 스타일 불러오기
        productName: action.payload.productName,
        // 사이즈 불러오기
        size: action.payload.size,
        // 색상 불러오기
        color: action.payload.color,
        // // 리뷰 작성내용 불러오기
        comment: action.payload.comment,
        // // 작성 날짜 불러오기
        date: getDate(),
      };
      state.reviewID++;
      const newReviewlist = state.reviewlist.concat(newReview);
      state.reviewlist = newReviewlist;
    },
    // 리뷰 삭제하기
    deleteReview: (state, action) => {
      // reviewInput배열에서 reiviewID가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
      const newReviewlist = state.reviewlist.filter(
        (review) =>
          !(
            review.userID == action.payload.userID &&
            review.reviewID == action.payload.reviewID
          )
      );
      state.reviewlist = newReviewlist;
    },
    // 리뷰 수정하기
    editReview: (state, action) => {
      state.reviewlist = state.reviewlist.map((review) => {
        return action.payload.userID == review.userID &&
          action.payload.reviewID == review.reviewID
          ? action.payload
          : review;
      });
    },
  },
});

export const { inputReview, deleteReview, editReview } = reviewSlice.actions;
export default reviewSlice.reducer;
