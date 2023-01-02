// 주문 내역
import { createSlice } from "@reduxjs/toolkit";

// 주문 날짜
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const today = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${today}`;
};

// 초기값
const initialState = {
  orderID: 2,
  orderlist: [
    {
      user: "abc123", // 현재로그인한 아이디가 들어가도록 만들고, 테스트용이라 명시하기
      orderID: 1,
      orderDate: "2022.12.24",
      productID: 2,
      category: "short",
      productName: "스탠다드 핏",
      color: "blue",
      size: "L",
      quantity: 8,
      imgArray: [{ print: "front", imageUrl: "" }],
      thumbnail: "short-standard-blue-front.jpg",
      totalPay: 76000,
      delivery: "배송완료",
    },
    { 
      user: "abc123",
      orderID: 2,
      orderDate: "2022.12.28",
      productID: 5,
      category: "long",
      productName: "스탠다드 핏",
      color: "cream",
      size: "S",
      quantity: 4,
      imgArray: [
        { print: "front", imageUrl: "" },
        { print: "back", imageUrl: "" },
      ],
      thumbnail: "long-standard-cream-front.jpg",
      totalPay: 38000,
      delivery: "상품준비",
    },
    { 
      // 다른아이디 더미 1개 - 구매내역 필터 적용
    }
  ],
};

const orderSlice = createSlice({
  name: "orderlist",
  initialState,
  reducers: {
    // 구매내역에 담기
    inputOrder: (state, action) => {
      const cartlist = action.payload.cartlist;
      for (let i = 0; i < cartlist.length; i++) {
        cartlist[i].user = action.payload.user;
        cartlist[i].orderID = ++state.orderID;
        cartlist[i].orderDate = getDate();
        cartlist[i].delivery = "상품준비";
        delete cartlist[i].cartID;
      }
      const newOrderlist = state.orderlist.concat(cartlist);
      state.orderlist = newOrderlist;
    },
    // 회원가입을 할 때, 후기작성 기능을 확인하기 위한 더미데이터 추가
    AddDummyData: (state, action) => {

    }
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
