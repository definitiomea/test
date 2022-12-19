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
  orderID: 0, // 테스트용 데이터 지우고 0으로 초기화할 것
  orderlist: [
    // 테스트용 데이터
    // {
    //   user: "", // 누구의 구매내역인지 알아야하므로 유저 추가
    //   orderID: 1,
    //   orderDate: "", // 주문날짜 추가
    //   category: "short",
    //   productID: 1,
    //   productName: "슬림 핏",
    //   color: "black",
    //   size: "S",
    //   print: "front",
    //   quantity: 5,
    //   price: "47,500",
    //   // 이미지 : 도안이 들어간 사진으로 보일것인지
    //   thumbnail: "short-slim-black-front.jpg",
    //   delivery: "상품준비"
    // },
    // {
    //   user: "",
    //   orderID: 2,
    //   orderDate: "",
    //   category: "short",
    //   productID: 2,
    //   productName: "스탠다드 핏",
    //   color: "blue",
    //   size: "M",
    //   print: "back",
    //   quantity: 2,
    //   price: "19,000",
    //   thumbnail: "short-stnadard-blue-front.jpg",
    //   delivery: "상품준비"
    // },
    // {
    //   user: "",
    //   orderID: 3,
    //   orderDate: "",
    //   category: "short",
    //   productID: 3,
    //   productName: "릴렉스 핏",
    //   color: "beige",
    //   size: "L",
    //   print: "front / back",
    //   quantity: 3,
    //   price: "28,500",
    //   thumbnail: "short-relax-beige-front.jpg",
    //   delivery: "상품준비"
    // },
  ],
};

const orderSlice = createSlice({
  name: "orderlist",
  initialState,
  reducers: {
    // 구매내역에 담기 - cartID 지우기, totalPay 문자열로, 주문 날짜 추가
    inputOrder: (state, action) => {
      const cartlist = action.payload.cartlist;
      const product = action.payload.product;

      const newOrderlist = cartlist;
      for (let i = 0; i < newOrderlist.length; i++) {
        newOrderlist[i].user = action.payload.user;
        newOrderlist[i].orderID = cartlist[i].cartID;
        newOrderlist[i].orderDate = getDate();
        newOrderlist[i].category = product[i].category;
        newOrderlist[i].productName = product[i].productName;
        newOrderlist[i].price = cartlist[i].totalPay.toLocaleString("ko-KR");
        newOrderlist[i].delivery = "상품준비"
        delete cartlist[i].totalPay;
        delete cartlist[i].cartID;
      }

      console.log(newOrderlist);
      // const newOrderlist = state.orderlist.concat(newOrder);
      // state.orderlist = newOrderlist;
      // console.log(state.orderlist);
    },
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
