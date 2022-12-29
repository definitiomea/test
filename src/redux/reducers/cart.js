// 장바구니 리스트 관리
import { createSlice } from "@reduxjs/toolkit";

// 초기값
const initialState = {
  cartID: 0,
  cartlist: [],
};

// 구매수량 최소, 최대값
const MAX_QUANTITY = 999;
const MIN_QUANTITY = 1;

const cartSlice = createSlice({
  name: "cartlist",
  initialState,
  reducers: {
    // 장바구니에 담기
    inputCart: (state, action) => {
      const newCartitem = {
        cartID: state.cartID++,
        productID: action.payload.id,
        color: action.payload.color,
        size: action.payload.size,
        quantity: action.payload.quantity,
        totalPay: action.payload.quantity * action.payload.productPrice,
        imgArray: action.payload.imgArray,
      };
      const newCartlist = state.cartlist.concat(newCartitem);
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 -1 (구매수량 최소 1)
    quantityDecrease: (state, action) => {
      const newCartlist = state.cartlist.map((item) => {
        if (
          item.cartID == action.payload.cartID &&
          item.quantity > MIN_QUANTITY
        ) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPay: action.payload.productPrice * (item.quantity - 1),
          };
        } else {
          return item;
        }
      });
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 +1 (구매수량 최대 999)
    quantityIncrease: (state, action) => {
      const newCartlist = state.cartlist.map((item) => {
        if (
          item.cartID == action.payload.cartID &&
          item.quantity < MAX_QUANTITY
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPay: action.payload.productPrice * (item.quantity + 1),
          };
        } else {
          return item;
        }
      });
      state.cartlist = newCartlist;
    },
    // 장바구니 상품별 구매수량 직접 입력 (구매수량 최소 1, 최대 999)
    quantityInput: (state, action) => {
      const newQuantity = () => {
        if (action.payload.value < MIN_QUANTITY) {
          return 1;
        } else if (action.payload.value > MAX_QUANTITY) {
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
            totalPay: action.payload.productPrice * newQuantity(),
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
