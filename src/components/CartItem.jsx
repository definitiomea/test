import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  quantityIncrease,
  quantityDecrease,
  quantityInput,
  deleteItem,
} from "../redux/reducers/cart";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const CartItem = (props) => {
  const { cartItem, productlist, dispatch } = props; // Cart.jsx
  const [product, setProduct] = useState({});
  const [totalPay, setTotalPay] = useState(cartItem.totalPay);
  const inputRef = useRef();

  // 구매 수량 변경 : +1 , -1, 직접입력
  const handleDecrease = () => {
    dispatch(
      quantityDecrease({
        cartID: cartItem.cartID,
        productPrice: parseInt(product.price.replace(",", "")),
      })
    );
  };
  const handleIncrease = () => {
    dispatch(
      quantityIncrease({
        cartID: cartItem.cartID,
        productPrice: parseInt(product.price.replace(",", "")),
      })
    );
  };
  const handleInput = (e) => {
    dispatch(
      quantityInput({
        cartID: cartItem.cartID,
        productPrice: parseInt(product.price.replace(",", "")),
        value: e.target.value,
      })
    );
  };

  // 장바구니 아이템의 ImgArr(사용자 도안 배열)을 print: front - back 순으로 바꾸기
  const newImgArr = () => {
    if (cartItem.imgArray.length == 2) {
      return cartItem.imgArray[0].print == "back"
        ? cartItem.imgArray.slice(0).reverse()
        : cartItem.imgArray;
    } else {
      return cartItem.imgArray;
    }
  };

  // 상품리스트에서 장바구니에 담긴 아이템들의 상품정보 찾기
  useEffect(() => {
    const item = productlist.find(
      (productItem) => productItem.productID == cartItem.productID
    );
    setProduct(item);
  }, []);

  // 구매 수량이 바뀔 때마다 input과 price에 반영하기 위함
  useEffect(() => {
    inputRef.current.value = cartItem.quantity;
    setTotalPay(cartItem.totalPay);
  }, [cartItem.quantity]);

  return (
    <li>
      <ProductWrap>
        {/* 
          이제 적절한 데이터 호출 부분 
          1) 만약 장바구니에 들어가는 아이템이 이미지를 하나만 가져서, imgArray의 길이가 0이라고 한다면 이미지 한 개만 보여주고
          
          ※ 한개만 들어가도 배열안에 있던데 맞는건지 확인할 것

          {cartItem.img && cartItem.imgArray.length == 0 ? <img src={cartItem.img} alt="" /> : ""}
          2) 만약 장바구니에 들어가는 아이템이 이미지를 최대 2개 가지기 때문에 imgArray의 길이가 0을 넘긴다고 한다면 해당 imgArray를 쭉 보여주도록 설정했어요
          {cartItem.imgArray && cartItem.imgArray.length > 0 ? cartItem.imgArray.map((pic) => (<img src={pic.imageUrl}></img>)) : ""}
        */}
        {newImgArr().map((item, i) => (
          <img src={item.imageUrl} key={i} />
        ))}
        <div>
          <div>{product.category}</div>
          <div>{`${product.productName} (${cartItem.color})`}</div>
          <div>
            print :
            {/*
            이쪽도 조건부에 따라 필요한 만큼만 나오도록 각 아이템의 imgArray 배열의 길이를 따져서 렌더링해서 끝
            {cartItem.imgArray && cartItem.imgArray.length > 0 ? cartItem.imgArray.map((print) => (` ${print.print} `)) : ""}
             */}
            {newImgArr().length == 2 ? (
              <span>
                {newImgArr()[0].print} / {newImgArr()[1].print}
              </span>
            ) : (
              <span>{newImgArr()[0].print}</span>
            )}
          </div>
        </div>
      </ProductWrap>
      <div>{cartItem.size}</div>
      <QuantityWrap>
        <IconButton
          sx={{ borderRadius: 0, "&:hover": { color: "#dc3545" } }}
          aria-label="remove"
          onClick={handleDecrease}
        >
          <RemoveIcon />
        </IconButton>
        <input
          type="number"
          defaultValue={cartItem.quantity}
          ref={inputRef}
          onChange={handleInput}
        />
        <IconButton
          sx={{ borderRadius: 0, "&:hover": { color: "#dc3545" } }}
          aria-label="add"
          onClick={handleIncrease}
        >
          <AddIcon />
        </IconButton>
      </QuantityWrap>
      <div>{totalPay.toLocaleString("ko-KR")}</div>
      <IconButton
        sx={{ "&:hover": { color: "#dc3545" } }}
        aria-label="delete"
        onClick={() => {
          dispatch(deleteItem(cartItem.cartID));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default CartItem;

const ProductWrap = styled.div`
  display: flex;
  justify-self: left;
  align-items: center;
  > div {
    margin-left: 1rem;
    > div {
      &:last-child {
        padding-top: 1rem;
      }
    }
    span {
      margin-left: 0.5rem;
    }
  }
  // 미디어쿼리 - 작은 화면에서는 이미지 안 보이게
  ${"img"} {
    width: 120px;
    min-width: 120px;
    min-height: 120px;
    margin-right: 0.5rem;
    background-color: #dee2e6;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const QuantityWrap = styled.div`
  display: flex;
  background-color: #f8f9fa;
  input {
    height: auto;
    max-width: 3.5rem;
    min-height: 32px;
    text-align: center;
    border: none;
    background-color: #f8f9fa;
    color: black;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:active {
      background-color: #e9ecef;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 1px 1px #dee2e6 inset;
    }
  }
  @media screen and (max-width: 768px) {
    button {
      display: none;
    }
  }
`;
