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
  
  const inputProps = () => {
    if (product) {
      return {
        cartID: cartItem.cartID,
        productPrice: parseInt(product.price.replace(",", "")),
      };
    }
  };

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
    // inputProps().value = e.target.value;
    dispatch(
      quantityInput({
        cartID: cartItem.cartID,
        productPrice: parseInt(product.price.replace(",", "")),
        value: e.target.value,
      })
    );
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
        {/** 이미지 수정 */}
        {/* {getImage(findProduct(cartItem))} */}
        {/*
        {cartItem.img && cartItem.imgArray.length == 0 ? <img src={cartItem.img} alt="" /> : ""}
        {cartItem.imgArray && cartItem.imgArray.length > 0 ? cartItem.imgArray.map((pic) => (<img src={pic.imageUrl}></img>)) : ""}
        */}
        <img />
        <div>
          <div>{product.category}</div>
          <div>{`${product.productName} (${cartItem.color})`}</div>
          {/** print는 데이터 형태 확인할 것(수정 가능성 있음) */}
          <div>
            print : 
            {/*
            {cartItem.imgArray.length == 0 ? cartItem.print : ""}{" "}
            {cartItem.imgArray && cartItem.imgArray.length > 0
              ? cartItem.imgArray.map((print) => ` ${print.print} `)
              : ""}
             */}
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
  align-self: center;
  justify-self: left;
  ${"div"} {
    &:last-child {
      padding-top: 1rem;
    }
  }
  // 미디어쿼리 - 작은 화면에서는 이미지 안 보이게
  ${"img"} {
    width: 120px;
    min-width: 120px;
    min-height: 120px;
    margin-right: 1.5rem;
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
