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
  orderID: 3,
  orderlist: [
    {
      userId: "abc123",
      itemlist: [
        {
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
      ],
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
        cartlist[i].orderID = state.orderID++;
        cartlist[i].orderDate = getDate();
        cartlist[i].delivery = "상품준비";
        delete cartlist[i].cartID;
      }

      const index = state.orderlist.findIndex(
        (el) => el.userId === action.payload.user
      );
      if (index === -1) {
        state.orderlist = state.orderlist.concat({
          userId: action.payload.user,
          itemlist: cartlist,
        });
      } else {
        const newItemlist = state.orderlist[index].itemlist.concat(cartlist);
        state.orderlist[index] = {
          ...state.orderlist[index],
          itemlist: newItemlist,
        };
      }
    },
    // 회원가입을 할 때, 후기작성 기능을 확인하기 위해 배송이 완료된 더미데이터 추가
    addDummyData: (state, action) => {
      const data = {
        orderID: state.orderID++,
        orderDate: getDate(),
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
      };
      state.orderlist = state.orderlist.concat({
        userId: action.payload,
        itemlist: [data],
      });
    },
    // 해당 구매내역의 리뷰를 작성하면 구매내역에 리뷰 정보(리뷰아이디)가 추가됨
    addReviewInOrder: (state, action) => {
      const index = state.orderlist.findIndex(
        (el) => el.userId === action.payload.userID
      );
      const newItemlist = state.orderlist[index].itemlist.map((item) =>
        item.orderID === action.payload.orderID
          ? { ...item, reviewID: action.payload.reviewID }
          : item
      );
      state.orderlist[index].itemlist = newItemlist;
    },
  },
});

export const {
  inputOrder,
  addDummyData,
  addReviewInOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
