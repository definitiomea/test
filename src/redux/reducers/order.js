// 주문 내역

import { createSlic } from "@reduxjs/toolkit";

const initalState = {
  orderID: 0,
  orderlist: [
    // 테스트용 데이터
    {
      orderID: 1,
      orderDate: "20221211",
      totalPay: "98,000", // 배송비 포함
      itemlist: [
        {
          productID: 1,
          // productName: "", 
          color: "black",
          size: "S",
          print: "front",
          quantity: 5,
          subTotal: "47,500",
        },
        {
          productID: 2,
          color: "navy",
          size: "M",
          print: "back",
          quantity: 2,
          subTotal: "19,000",
        },
        {
          productID: 3,
          color: "white",
          size: "L",
          print: "front / back",
          quantity: 3,
          subTotal: "28,500",
        },
      ],
    },
    {
      orderID: 2,
      orderDate: "20221212",
      totalPay: "23,000", // 배송비 포함
      itemlist: [
        {
          productID: 2,
          color: "navy",
          size: "M",
          print: "back",
          quantity: 2,
          subTotal: "19,000",
        },
      ],
    },
  ],
};
