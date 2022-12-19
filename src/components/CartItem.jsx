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
import { useRef, useState } from "react";
import { useEffect } from "react";

const CartItem = (props) => {
  const { cartItem, productlist, dispatch } = props; // Cart.jsx
  const inputRef = useRef();
  const [total, setTotal] = useState(cartItem.totalPay)

  // 상품리스트에서 cartlist의 상품정보 찾기
  const findProduct = (cartItem) =>
    productlist.find(
      (productItem) => productItem.productID == cartItem.productID
    );

  // 구매 수량이 바뀔 때마다 input에 반영하기 위함
  useEffect(() => {
    inputRef.current.value = cartItem.quantity;
  }, [cartItem.quantity]);
  
  // 상품별 총 금액이 바뀔 때마다 반영하기 위함
  useEffect(() => {
    setTotal(cartItem.totalPay);
  }, [cartItem.totalPay]);

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

  return (
    <li>
      <StyledProduct>
        {/* {getImage(findProduct(cartItem))} */}

        {/* 이제 적절한 데이터 호출 부분 */}

        {/* 1) 만약 장바구니에 들어가는 아이템이 이미지를 하나만 가져서, imgArray의 길이가 0이라고 한다면 이미지 한 개만 보여주고 */}
        {/* {cartItem.img && cartItem.imgArray.length == 0 ? <img src={cartItem.img} alt="" /> : ""} */}
        {/* 2) 만약 장바구니에 들어가는 아이템이 이미지를 최대 2개 가지기 때문에 imgArray의 길이가 0을 넘긴다고 한다면
        해당 imgArray를 쭉 보여주도록 설정했어요 */}
        {cartItem.imgArray && cartItem.imgArray.length > 0 ? cartItem.imgArray.map((pic) => (<img src={pic.imageUrl}></img>)) : ""}
        <div>
          <div>{findProduct(cartItem).category}</div>
          <div>
            {`${findProduct(cartItem).productName} (${cartItem.color})`}
          </div>
          {/** print는 데이터 형태 확인할 것(수정 가능성 있음) */}

          {/* 이쪽도 조건부에 따라 필요한 만큼만 나오도록 각 아이템의 imgArray 배열의 길이를 따져서 렌더링해서 끝 */}
          <div>print : {cartItem.imgArray.length == 0 ? cartItem.print : ""} {cartItem.imgArray && cartItem.imgArray.length > 0 ? cartItem.imgArray.map((print) => (` ${print.print} `)) : ""}</div>
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
            dispatch(quantityIncrease({
              cartID: cartItem.cartID,
              productPrice: findProduct(cartItem).price,
            }));
          }}
        >
          <AddIcon />
        </IconButton>
      </ButtonWrap>
      <div>{total.toLocaleString("ko-KR")}</div>
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
  // 미디어쿼리 - 작은 화면에서는 상품이미지 안 보이게
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
