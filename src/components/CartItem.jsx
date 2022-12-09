import { useRef } from "react";
import { Grid } from "@material-ui/core";

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
    <Grid>
      <div>{findProduct(item).productImg}</div>
      <div>
        {findProduct(item).category} <br />
        {findProduct(item).productName} {"(" + item.color + ")"} <br />
        print : {item.print}
      </div>
      <div>{item.size}</div>
      <div>
        <button
          onClick={() => {
            amountDecrease(item.cartID);
          }}
        >
          -
        </button>
        <input
          type="number"
          defaultValue={item.amount}
          ref={inputRef}
          onChange={(e) => {
            amountInput(e, item.cartID);
          }}
        />
        <button
          onClick={() => {
            amountIncrease(item.cartID);
          }}
        >
          +
        </button>
      </div>
      <div>{findProduct(item).price * item.amount}</div>
      <button
        onClick={() => {
          deleteItem(item.cartID);
        }}
      >
        X
      </button>
    </Grid>
  );
};

export default CartItem;