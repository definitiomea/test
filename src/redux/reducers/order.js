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
  orderID: 1, // 테스트용 데이터 지우고 0으로 초기화할 것
  orderlist: [
    // 테스트용 데이터
    {
      user: "", // 누구의 구매내역인지 알아야하므로 유저 추가
      orderID: 1,
      orderDate: "2022.12.19",
      category: "short",
      productID: 1,
      productName: "슬림 핏",
      color: "black",
      size: "S",
      quantity: 5,
      price: "47,500",
      imgArray: [
        {print: "front", imgUrl: ""},
        {print: "back", imgUrl: ""}
      ],
      // 이미지 : 도안이 들어간 사진으로 보일것인지
      // thumbnail: "short-slim-black-front.jpg",
      delivery: "상품준비"
    },
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
    // 구매내역에 담기
    inputOrder: (state, action) => {
      const copyCartlist = JSON.parse(JSON.stringify(action.payload.cartlist));
      const copyProduct = JSON.parse(JSON.stringify(action.payload.product));

      // category, productName, thumbnail (인덱스 활용)
      

      const newOrder = copyCartlist;
      for (let i = 0; i < newOrder.length; i++) {
        newOrder[i].user = action.payload.user;
        newOrder[i].orderID = ++state.orderID;
        newOrder[i].orderDate = getDate();
        newOrder[i].category = copyProduct[i].category;
        newOrder[i].productName = copyProduct[i].productName;
        newOrder[i].price = copyCartlist[i].totalPay.toLocaleString("ko-KR");
        newOrder[i].delivery = "상품준비"
        delete copyCartlist[i].totalPay;
        delete copyCartlist[i].cartID;
      }

      const newOrderlist = state.orderlist.concat(newOrder);
      state.orderlist = newOrderlist;
      console.log(state.orderlist)
    },
  },
});

export const { inputOrder } = orderSlice.actions;

export default orderSlice.reducer;
