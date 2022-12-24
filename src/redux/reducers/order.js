// 주문 내역
import { createSlice } from "@reduxjs/toolkit";

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
      user: "abc123",
      orderID: 1,
      orderDate: "2022.12.24",
      productID: 2,
      category: "short",
      productName: "스탠다드 핏",
      color: "orange",
      size: "S",
      quantity: 4,
      imgArray: [
        {print: "front", imggUrl: ""},
        {print: "back", imggUrl: ""},
      ],
      thumbnail: "short-standard-orange-front.jpg",
      totalPay: 38000,
      delivery: "상품준비",
    },
    {
      user: "abc123",
      orderID: 2,
      orderDate: "2022.12.24",
      productID: 2,
      category: "short",
      productName: "스탠다드 핏",
      color: "orange",
      size: "S",
      quantity: 4,
      imgArray: [
        {print: "front", imggUrl: ""},
        {print: "back", imggUrl: ""},
      ],
      thumbnail: "short-standard-orange-front.jpg",
      totalPay: 38000,
      delivery: "상품준비",
    },
    {
      user: "abc123",
      orderID: 3,
      orderDate: "2022.12.24",
      productID: 2,
      category: "short",
      productName: "스탠다드 핏",
      color: "orange",
      size: "S",
      quantity: 4,
      imgArray: [
        {print: "front", imggUrl: ""},
        {print: "back", imggUrl: ""},
      ],
      thumbnail: "short-standard-orange-front.jpg",
      totalPay: 38000,
      delivery: "배송완료",
    },
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
      }
      const newOrderlist = state.orderlist.concat(cartlist);
      state.orderlist = newOrderlist;
      console.log(state.orderlist);
    },
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
