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
  const [totalPay, setTotalPay] = useState(cartItem.totalPay);
  // 상품리스트에서 장바구니에 담긴 아이템들의 상품정보 찾기
  const product = productlist.find(
    (productItem) => productItem.productID == cartItem.productID
  );
  const price = parseInt(product.price.replace(",", ""));
  // 구매수량이 바뀔 때마다 반영하기 위한 ref
  const inputRef = useRef();

  // 구매 수량 변경 : +1 , -1, 직접입력
  const onDecrease = () => {
    dispatch(
      quantityDecrease({
        cartID: cartItem.cartID,
        productPrice: price,
      })
    );
  };
  const onIncrease = () => {
    dispatch(
      quantityIncrease({
        cartID: cartItem.cartID,
        productPrice: price,
      })
    );
  };
  const onInput = (e) => {
    dispatch(
      quantityInput({
        cartID: cartItem.cartID,
        productPrice: price,
        value: e.target.value,
      })
    );
  };

  // 장바구니 아이템의 ImgArr(사용자 도안 배열)을 print: front - back 순으로 정렬
  const newImgArr = () => {
    if (cartItem.imgArray.length == 2) {
      return cartItem.imgArray[0].print == "back"
        ? cartItem.imgArray.slice(0).reverse()
        : cartItem.imgArray;
    } else {
      return cartItem.imgArray;
    }
  };

  // 구매 수량이 바뀔 때마다 input과 totalPay에 반영하기 위함
  useEffect(() => {
    inputRef.current.value = cartItem.quantity;
    setTotalPay(cartItem.totalPay);
  }, [cartItem.quantity]);

  return (
    <div>
      <ProductWrap>
        {newImgArr().map((item, i) => (
          <img src={item.imageUrl} key={i} />
        ))}
        <div>
          <div>
            {product.category} {product.productName}
          </div>
          <div>
            color :<span>{cartItem.color}</span>
          </div>
          <div>
            print :
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
          onClick={onDecrease}
        >
          <RemoveIcon />
        </IconButton>
        <input
          type="number"
          defaultValue={cartItem.quantity}
          ref={inputRef}
          onChange={onInput}
        />
        <IconButton
          sx={{ borderRadius: 0, "&:hover": { color: "#dc3545" } }}
          aria-label="add"
          onClick={onIncrease}
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
    </div>
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
      &:first-child {
        padding-bottom: 1rem;
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
