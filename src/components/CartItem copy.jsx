import styled from "styled-components";
import { useRef } from "react";

const CartItem = (props) => {
  const { item, cartlist, setCartlist, findProduct } = props; // CartBox
  const inputRef = useRef();

  // 구매수량 1 감소
  const amountDecrease = (cartID) => {
    const newCart = cartlist.map((item) => {
      if (item.cartID == cartID && item.amount > 1) {
        inputRef.current.value = item.amount - 1;
        return { ...item, amount: item.amount - 1 };
      } else {
        return item;
      }
    });
    setCartlist(newCart);
    localStorage.setItem("moti_cartlist", JSON.stringify(newCart)); // cart.js로 옮길때 삭제?
  };

  // 구매수량 1 증가
  const amountIncrease = (cartID) => {
    const newCart = cartlist.map((item) => {
      if (item.cartID == cartID && item.amount < 999) {
        inputRef.current.value = item.amount + 1;
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    setCartlist(newCart);
    localStorage.setItem("moti_cartlist", JSON.stringify(newCart));
  };

  // 구매수량 직접 입력
  const amountInput = (e, cartID) => {
    // 1보다 작으면 1이, 999보다 크면 999가 되도록 수정
    const newAmount = e.target.value < 1 ? 1 : +e.target.value;
    const newCart = cartlist.map((item) => {
      if (item.cartID == cartID && item.amount < 999) {
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    setCartlist(newCart);
    localStorage.setItem("moti_cartlist", JSON.stringify(newCart));
  };

  // 장바구니에서 삭제
  const deleteItem = (cartID) => {
    const newCartlist = cartlist.filter((item) => item.cartID != cartID);
    setCartlist(newCartlist);
    localStorage.setItem("moti_cartlist", JSON.stringify(newCartlist));
  };

  return (
    <li>
      <StyledProduct>
        <div className="img">{findProduct(item).productImg}</div>
        <div>
          <div>{findProduct(item).category}</div>
          <div>
            {findProduct(item).productName} {"(" + item.color + ")"}
          </div>
          <div>print : {item.print}</div>
        </div>
      </StyledProduct>
      <div>{item.size}</div>
      <div>
        <button onClick={() => {amountDecrease(item.cartID);}}>-</button>
        <input
          type="number"
          defaultValue={item.amount}
          ref={inputRef}
          onChange={(e) => {
            amountInput(e, item.cartID);
          }}
        />
        <button onClick={() => {amountIncrease(item.cartID);}}>+</button>
      </div>
      <div>{findProduct(item).price * item.amount}</div>
      <button
        onClick={() => {
          deleteItem(item.cartID);
        }}
      >
        X
      </button>
    </li>
  );
};

// 상품 이미지 클릭하면 해당 상품으로 이동

export default CartItem;

const StyledProduct = styled.div`
  display: flex;
  align-items: center;
  justify-self: left;
  .img {
    // 임시 - 상품이미지 불러와서 대체할 것 <img>
    // 미디어쿼리 - 작은 화면에서는 사진 안보이게
    width: 120px;
    height: 120px;
    background-color: gray;
    margin-right: 1.5rem;
  }
`;
