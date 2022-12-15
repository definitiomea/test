// 장바구니 리스트 관리
import { createSlice } from "@reduxjs/toolkit";

// 초기값
const initialState = {
  cartID: 0, // 장바구니 아이템 삭제를 위해 겹치는 일이 없도록 (고유값)
  cartlist: [
    // 테스트용 데이터
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
      color: "blue",
      size: "M",
      print: "back",
      quantity: 2,
    },
    {
      cartID: 3,
      productID: 3,
      color: "beige",
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
        cartID: 4,
        productID: 1,
        color: "black",
        size: "S",
        print: "front", // 배열이나 문자열이나
        quantity: 5, // amount에서 quantity로 수정
        totalPay: 47500, // 상품별 금액 * 구매수량 (금액 계산을 여러번하기 때문에 숫자형으로)
        // 이미지
        img : "",
      };
      const newCartlist = state.cartlist.concat(newCartitem);
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 -1 (구매수량 최소 1)
    quantityDecrease: (state, action) => {
      const price = parseInt(action.payload.productPrice.replace(",", ""));
      const newCartlist = state.cartlist.map((item) => {
        if (item.cartID == action.payload.cartID && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPay: price * (item.quantity - 1),
          };
        } else {
          return item;
        }
      });
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 +1 (구매수량 최대 999)
    quantityIncrease: (state, action) => {
      const price = parseInt(action.payload.productPrice.replace(",", ""));
      const newCartlist = state.cartlist.map((item) => {
        if (item.cartID == action.payload.cartID && item.quantity < 999) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPay: price * (item.quantity + 1),
          };
        } else {
          return item;
        }
      });
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 직접 입력 (구매수량 최소 1, 최대 999)
    quantityInput: (state, action) => {
      const price = parseInt(action.payload.productPrice.replace(",", ""));
      const newQuantity = () => {
        if (action.payload.value < 1) {
          return 1;
        } else if (action.payload.value > 999) {
          return 999;
        } else {
          return parseInt(action.payload.value);
        }
      };
      const newCartlist = state.cartlist.map((item) => {
        if (item.cartID == action.payload.cartID) {
          return {
            ...item,
            quantity: newQuantity(),
            totalPay: price * newQuantity(),
          };
        } else {
          return item;
        }
      });
      state.cartlist = newCartlist;
    },
    // 장바구니 아이템 개별 삭제
    deleteItem: (state, action) => {
      const newCartlist = state.cartlist.filter(
        (item) => item.cartID != action.payload
      );
      state.cartlist = newCartlist;
    },
    // 장바구니 아이템 모두 삭제
    clearCart: (state) => {
      state.cartlist = [];
    },
  },
});

// 액션타입을 함수로 만들어서 내보내기
export const {
  inputCart,
  quantityIncrease,
  quantityDecrease,
  quantityInput,
  deleteItem,
  clearCart,
} = cartSlice.actions;

// 디스패치를 따로 내보내줌
export default cartSlice.reducer;
