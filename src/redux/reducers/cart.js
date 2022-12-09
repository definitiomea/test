// 장바구니 리스트 관리

import { createSlice } from "@reduxjs/toolkit";

let cartID = 0;

// 초기값
const initialState = {
  cartlist: [],
};

const cartSlice = createSlice({
  name: "cartlist",
  initialState,
  reducers: {
    // 장바구니에 담기
    inputCart: (state, action) => {
      const newCartitem = {
        cartID: 1,
        productID: 1,
        color: "black",
        size: "S",
        print: "font",
        amount: 5,
        // 이미지
      };
      state.cartlist.push(newCartitem);
    },


    // 장바구니 상품별 수량 1증가, 1감소, 직접 입력 : 이거는 제가 할 것
    amountDecrease: (state) => {},
    amountIncrease: (state) => {},
    amountInput: (state, action) => {},
  },
});

// 액션타입을 함수로 만들어서 내보내기
export const { inputCart, amountIncrease, amountDecrease, amountInput } = cartSlice.actions;

// 디스패치를 따로 내보내줌
export default cartSlice.reducer;
