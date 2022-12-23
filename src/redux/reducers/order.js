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
  orderID: 0,
  orderlist: [],
};

const orderSlice = createSlice({
  name: "orderlist",
  initialState,
  reducers: {
    // 구매내역에 담기
    inputOrder: (state, action) => {
      const cartlist = action.payload.cartlist;
      for (let i = 0; i <cartlist.length; i++) {
        cartlist[i].user = action.payload.user;
        cartlist[i].orderID = ++state.orderID;
        cartlist[i].orderDate = getDate();
        cartlist[i].delivery = "상품준비"
        delete cartlist[i].cartID;
      }
      const newOrderlist = state.orderlist.concat(cartlist);
      state.orderlist = newOrderlist;
      console.log(state.orderlist);
    },
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
