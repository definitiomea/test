import styled from "styled-components";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import List from "../style/List";
import MyButton from "../style/Button";

import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/reducers/cart";
import Loading from "../components/Loding";

const Cart = () => {
  const cartlist = useSelector((state) => state.cartlist.cartlist);
  const dispatch = useDispatch();
  const [dataloading, setDataloading] = useState(false);
  const [productlist, setProductlist] = useState("");
  const [deliveryPay, setDeliveryPay] = useState(3000);

  // 상품리스트 데이터 들고오기
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

  return (
    <Container maxWidth="lg">
      {productlist ? (
        <>
          <Title>
            <FontAwesomeIcon icon={faCartShopping} />
            <h2>My Cart</h2>
          </Title>
          <List>
            <li className="label">
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
            </li>
            {cartlist.length == 0 ? (
              <li className="product-empty">Empty</li>
            ) : (
              <>
                {cartlist.map((cartItem) => (
                  <CartItem
                    key={cartItem.cartID}
                    cartItem={cartItem}
                    productlist={productlist}
                    dispatch={dispatch}
                  />
                ))}
              </>
            )}
          </List>
          <Wrap>
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              배송지 직접 입력하는 공간 <br />
              저장된 배송지 정보 불러오는 버튼 <br />
              저장된 배송지가 있다면 자동으로 채워준다(컴포넌트로 빼기)
            </div>
            <div className="summary">
              <div>
                <div>
                  <div>Subtotal</div>
                  <div>Delivery</div>
                  <div className="total">Total Price</div>
                </div>
                <div>
                  <div>{getSubtotal().toLocaleString("ko-KR")}</div>
                  <div>{deliveryPay.toLocaleString("ko-KR")}</div>
                  <div className="total">
                    {(getSubtotal() + deliveryPay).toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>
              <MyButton>주문하기</MyButton>
            </div>
          </Wrap>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

// 주문하기 버튼을 누르면 모달창으로 주문완료 띄우기, 데이터는
// orderlist로 이동
// 주문완료 모달창에는 홈으로 가기/주문내역 확인하기 버튼
// 홈은 홈으로, 주문내역은 마이페이지로 이동

export default Cart;

const Title = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  ${"h2"} {
    display: inline-block;
    font-weight: bold;
    margin: 0; // GlobalStyles?
    margin-left: 1rem;
  }
  &:first-child {
    font-size: 1.8rem;
  }
`;

const Wrap = styled.div`
  display: flex;
  margin: 3rem 0;
  ${"div"} {
    width: 100%;
  }
  .delivery-info {
    flex: 2;
    padding: 0rem 1.2rem;
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