// 장바구니 리스트 관리

import { createSlice } from "@reduxjs/toolkit";

let cartID = 0;

// 초기값
const initialState = {
  cartlist: [
    // 테스트용 데이터, 후에 삭제할 것, amount > quantity로 바꾸기 요청
    {
      cartID: 1,
      productID: 1,
      color: "black",
      size: "S",
      print: "front",
      quantity: 5,
    },
    {
      cartID: 2,
      productID: 2,
      color: "navy",
      size: "M",
      print: "back",
      quantity: 2,
    },
    {
      cartID: 3,
      productID: 3,
      color: "white",
      size: "L",
      print: "front / back",
      quantity: 3,
    },
  ],
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
    quantityDecrease: (state) => {},
    quantityIncrease: (state) => {},
    quantityInput: (state, action) => {},
  },
});

// 액션타입을 함수로 만들어서 내보내기
export const { inputCart, quantityIncrease, quantityDecrease, quantityInput } =
  cartSlice.actions;

// 디스패치를 따로 내보내줌
export default cartSlice.reducer;
