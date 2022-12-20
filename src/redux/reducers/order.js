// 주문 내역
import { createSlice } from "@reduxjs/toolkit";

// 초기값
const initialState = {
  orderID: 0,
  orderlist: [
    // 테스트용 데이터 - 필요없는 데이터는 삭제할 것
    {
      // 누구의 구매내역인지 알아야하므로 유저 추가
      user: "",
      orderID: 1,
      category: "short",
      productID: 1,
      productName: "슬림 핏",
      color: "black",
      size: "S",
      // 코멘트에는 안보여도 구매내역에는 보이려나 싶어서 추가  > 어디 프린트하는지(앞/뒤) & 구매수량 
      print: "front",
      quantity: 5,
      price: "47,500",
      // 이미지 : 도안이 들어간 사진으로 보일것인지
      thumbnail: "short-slim-black-front.jpg",
      // 배송상태
      delivery: "상품준비"
    },
    {
      user: "",
      orderID: 2,
      category: "short",
      productID: 2,
      productName: "스탠다드 핏",
      color: "blue",
      size: "M",
      print: "back",
      quantity: 2,
      price: "19,000",
      thumbnail: "short-stnadard-blue-front.jpg",
      delivery: "상품준비"
    },
    {
      user: "",
      orderID: 3,
      category: "short",
      productID: 3,
      productName: "릴렉스 핏",
      color: "beige",
      size: "L",
      print: "front / back",
      quantity: 3,
      price: "28,500",
      thumbnail: "short-relax-beige-front.jpg",
      delivery: "상품준비"
    },
  ],
};

const orderSlice = createSlice({
  name: "orderlist",
  initialState,
  reducers: {
    // 구매내역에 담기
    inputOrder: (state, action) => {},
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
