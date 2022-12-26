import styled from "styled-components";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import List from "../style/List";
import MyButton from "../style/Button";
// css module
import styles from "../css/cart.module.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/reducers/cart";
import { inputOrder } from "../redux/reducers/order";
import AddDeliveryList from "../components/AddDeliveryList";

const Cart = () => {
  const cartlist = useSelector((state) => state.cartlist.cartlist);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dataloading, setDataloading] = useState(false);
  const [productlist, setProductlist] = useState(null);
  const [deliveryPay, setDeliveryPay] = useState(3000);
  const navigate = useNavigate();

  // 배송비 제외 총 금액
  const getSubtotal = () => {
    // prev: 이전값 > 현재까지 누적된 값
    // cur : 현재값
    // 0 : 초기값, 안쓰면 배열의 첫번째 요소가 들어감
    const subtotal = cartlist.reduce((prev, cur) => {
      return (prev += cur.totalPay);
    }, 0);
    return subtotal;
  };

  // cartlist의 각 아이템에 해당되는 상품 정보 넣기
  const copyCartlist = () => {
    const copyCartlist = JSON.parse(JSON.stringify(cartlist));
    for (let i = 0; i < copyCartlist.length; i++) {
      const product = productlist.find(
        (product) => product.productID == copyCartlist[i].productID
      );
      let name = "";
      switch (product.productName) {
        case "슬림 핏":
          name = "slim";
          break;
        case "스탠다드 핏":
          name = "standard";
          break;
        case "릴렉스 핏":
          name = "relax";
          break;
      }
      copyCartlist[i].category = product.category;
      copyCartlist[i].productName = product.productName;
      copyCartlist[
        i
      ].thumbnail = `${product.category}-${name}-${copyCartlist[i].color}-front.jpg`;
      delete copyCartlist[i].cartID;
    }
    return copyCartlist;
  };

  // 주문하기
  const order = () => {
    if (cartlist.length == 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }
    if (JSON.stringify(user) === "{}") {
      alert("로그인 후 이용해주세요");
      return;
    }
    dispatch(
      inputOrder({
        user: user.id,
        cartlist: copyCartlist(),
      })
    );
    dispatch(clearCart());
    navigate("/orderconfirm");
  };

  // 상품리스트 데이터 들고오기 (db.json)
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/hans-4303/test/productList"
      );
      const data = await response.json();
      setProductlist(data);
      if (!productlist) {
        setDataloading(true);
      }
    };
    getData();
  }, [dataloading]);

  // 장바구니 아이템이 없으면 배송비를 0으로 출력
  useEffect(() => {
    cartlist.length == 0 ? setDeliveryPay(0) : setDeliveryPay(3000);
  }, [cartlist]);

  return (
    <>
      {productlist ? (
        // <StyledContainer maxWidth="lg">
        <div className={styles.box}>
          <div className={styles.title}>
            <FontAwesomeIcon icon={faCartShopping} />
            <h2>My Cart</h2>
          </div>
          <List>
            <div className="label">
              <div>Product Name</div>
              <div>Size</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
            {cartlist.length == 0 ? (
              <div className="item-empty">Empty</div>
            ) : (
              <div>
                {cartlist.map((cartItem) => (
                  <CartItem
                    key={cartItem.cartID}
                    cartItem={cartItem}
                    productlist={productlist}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            )}
          </List>
          <div className={styles.container}>
            <div className={styles["delivery-info"]}>
              <h3>Delivery Information</h3>
              <AddDeliveryList />
            </div>
            <div className={styles["summary"]}>
              <div>
                <div>
                  <div>Subtotal</div>
                  <div>Delivery</div>
                  <div className={styles.total}>Total Price</div>
                </div>
                <div>
                  <div>{getSubtotal().toLocaleString("ko-KR")}</div>
                  <div>{deliveryPay.toLocaleString("ko-KR")}</div>
                  <div className={styles.total}>
                    {(getSubtotal() + deliveryPay).toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>
              <MyButton onClick={order}>주문하기</MyButton>
            </div>
          </div>
        </div>
      ) : (
        // </StyledContainer>
        <Loading />
      )}
    </>
  );
};

export default Cart;

const StyledContainer = styled(Container)`
  min-height: calc(100vh - 236px);
  &.MuiContainer-root {
    padding: 0 48px;
  }
`;

const Title = styled.div`
  padding: 2rem 0;
  h2 {
    display: inline-block;
    margin: 0 0 0 1rem;
    font-family: "nav";
    font-size: 1.5rem;
    font-weight: bold;
  }
  svg {
    font-size: 1.3rem;
  }
`;

const MyContainter = styled.div`
  display: flex;
  padding: 3rem 0;
  ${"div"} {
    width: 100%;
  }
  .delivery-info {
    flex: 2;
  }
  .summary {
    flex: 1;
    padding: 2rem;
    background-color: #e9ecef;
    > div {
      display: flex;
      margin-bottom: 2rem;
      > div {
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .total {
      font-size: 1.2rem;
      font-weight: bold;
    }
    ${"div"} {
      padding: 0.2rem 0;
    }
  }
`;
