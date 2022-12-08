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
    localStorage.setItem("moti_cartlist", JSON.stringify(newCart));
  };

  // 구매수량 1 증가
  const amountIncrease = (cartID) => {
    const newCart = cartlist.map((item) => {
      if (item.cartID == cartID) {
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
    const newAmount = !(e.target.value > 0) ? 1 : +e.target.value;
    const newCart = cartlist.map((item) => {
      if (item.cartID == cartID) {
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
    const newCartlist = cartlist.filter((item) => (item.cartID != cartID));
    setCartlist(newCartlist);
    localStorage.setItem("moti_cartlist", JSON.stringify(newCartlist));
  };

  return (
    <Wrap>
      <div>{findProduct(item).productImg}</div>
      <div>
        <div>{findProduct(item).category}</div>
        <div>{findProduct(item).productName} {"(" + item.color + ")"}</div>
        <div>print : {item.print}</div>
      </div>
      <div>{item.size}</div>
      <div>
        <button onClick={() => {amountDecrease(item.cartID);}}>-</button>
        <input
          type="number"
          defaultValue={item.amount}
          ref={inputRef}
          onChange={(e) => {amountInput(e, item.cartID);}}
        />
        <button onClick={() => {amountIncrease(item.cartID);}}>+</button>
      </div>
      <div>{findProduct(item).price * item.amount}</div>
      <button onClick={() => {deleteItem(item.cartID);}}>X</button>
    </Wrap>
  );
};

export default CartItem;

const Wrap = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 2fr 2fr 1fr;
  gap: 1.5rem;
  align-items: center;
  justify-items: center;
  ${"input"} {
    max-width: 4rem;
  }
`