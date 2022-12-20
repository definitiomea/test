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

const CartItem = (props) => {
  const { cartItem, productlist, dispatch } = props; // Cart.jsx
  const inputRef = useRef();

  // 상품리스트에서 cartlist의 상품정보 찾기
  const findProduct = (cartItem) =>
    productlist.find(
      (productItem) => productItem.productID == cartItem.productID
    );

  // 상품별 총 금액
  const totalPay = (price, quantity) => {
    const pay = parseInt(price.replace(",", ""));
    const totalPay = pay * quantity;
    return totalPay.toLocaleString("ko-KR"); 
  }

  // 상품이미지 가져오기 >> 사용자가 도안을 편집한 이미지로 대체할 것
  const getImage = (cartItem) => {
    switch (cartItem.category) {
      case "short":
        return (
          <img
            src={require(`../img/shirts-img/short/${
              findProduct(cartItem).thumbnail[0]
            }`)}
            alt="No Image"
          />
        );
      case "long":
        return (
          <img
            src={require(`../img/shirts-img/long/${
              findProduct(cartItem).thumbnail[0]
            }`)}
            alt="No Image"
          />
        );
      default:
        return <div>No Image</div>;
    }
  };
  
  // 구매 수량이 바뀔 때마다 input에 반영하기 위함
  useEffect(() => {
    inputRef.current.value = cartItem.quantity;
  }, [cartItem.quantity]);

  return (
    <li>
      <StyledProduct>
        {getImage(findProduct(cartItem))}
        <div>
          <div>{findProduct(cartItem).category}</div>
          <div>
            {`${findProduct(cartItem).productName} (${cartItem.color})`}
          </div>
          {/** print는 데이터 형태 확인할 것(수정 가능성 있음) */}
          <div>print : {cartItem.print}</div>
        </div>
      </StyledProduct>
      <div>{cartItem.size}</div>
      <ButtonWrap>
        <IconButton
          sx={{ borderRadius: 0, "&:hover": { color: "#dc3545" } }}
          aria-label="remove"
          onClick={() => {
            dispatch(
              quantityDecrease({
                cartID: cartItem.cartID,
                productPrice: findProduct(cartItem).price,
              })
            );
          }}
        >
          <RemoveIcon />
        </IconButton>
        <input
          type="number"
          defaultValue={cartItem.quantity}
          ref={inputRef}
          onChange={(e) => {
            dispatch(
              quantityInput({
                cartID: cartItem.cartID,
                productPrice: findProduct(cartItem).price,
                value: e.target.value,
              })
            );
          }}
        />
        <IconButton
          sx={{ borderRadius: 0, "&:hover": { color: "#dc3545" } }}
          aria-label="add"
          onClick={() => {
            dispatch(
              quantityIncrease({
                cartID: cartItem.cartID,
                productPrice: findProduct(cartItem).price,
              })
            );
          }}
        >
          <AddIcon />
        </IconButton>
      </ButtonWrap>
      <div>{
      totalPay(findProduct(cartItem).price, cartItem.quantity)
      }</div>
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

// 상품 이미지 클릭하면 해당 상품으로 이동

export default CartItem;

const StyledProduct = styled.div`
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
    min-height: 120px;
    margin-right: 1.5rem;
    background-color: #dee2e6;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  background-color: #f8f9fa;
  ${"input"} {
    max-width: 4rem;
    text-align: center;
    border: none;
    background-color: #f8f9fa;
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
`;
