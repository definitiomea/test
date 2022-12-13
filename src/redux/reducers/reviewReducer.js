import { createSlice } from "@reduxjs/toolkit";

// 테스트 데이터
// 아이디
// 상품명
// 옵션(핏)
// 색상
// 사이즈
// 날짜
const initialState = {
  reviewList: [
    {
      id: 0,
      userID: "jeon",
      category: "short sleeve",
      productName: "slim fit",
      size: "S",
      rating: 5,
      comment: "핏이 정말 예뻐요",
      image: { src: "" },
      date: "2022-11-19",
    },
    {
      userID: "sun",
      category: "short sleeve",
      productName: "slim fit",
      size: "M",
      rating: 4,
      comment: "good good",
      image: { src: "" },
      date: "2022-11-20",
    },
    {
      userID: "jun",
      category: "short sleeve",
      productName: "standard fit",
      size: "L",
      rating: 5,
      comment: "품질이 좋습니다",
      image: { src: "" },
      date: "2022-11-18",
    },
    {
      userID: "jung",
      category: "short sleeve",
      productName: "relax fit",
      size: "M",
      rating: 4,
      comment: "다른 색도 사고 싶어요",
      image: { src: "" },
      date: "2022-11-20",
    },
    {
      userID: "yeon",
      category: "long sleeve",
      productName: "standard fit",
      size: "S",
      rating: 3,
      comment: "조금 커요",
      image: { src: "" },
      date: "2022-11-23",
    },
    {
      userID: "jungkook",
      category: "long sleeve",
      productName: "standard fit",
      size: "L",
      rating: 5,
      comment: "요즘 매일 입어요",
      image: { src: "" },
      date: "2022-12-01",
    },
    {
      userID: "jimin",
      category: "long sleeve",
      productName: "relax fit",
      size: "S",
      rating: 5,
      comment: "선물용으로도 좋아요",
      image: { src: "" },
      date: "2022-12-02",
    },
    {
      userID: "namjun",
      category: "long sleeve",
      productName: "relaxfit",
      size: "L",
      rating: 4,
      comment: "맘에 들어요~",
      image: { src: "" },
      date: "2022-12-05",
    },
  ],
};

const reviewSlice = createSlice({
  name: "reviewlist",
  initialState,
  reducers: {
    // 리뷰쓰기
    writeReivew: (state, action) => {
      const newReview = {
        userID: null,
        category: null,
        productName: null,
        size: null,
        rating: 5,
        comment: null,
      };
      state.review.push(newReview);
    },
    // 리뷰출력

    // 리뷰수정
  },
});

export const { writeReview } = reviewSlice.actions;
export default reviewSlice.reducer;
