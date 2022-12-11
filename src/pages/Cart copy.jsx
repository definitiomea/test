import styled from "styled-components";
import { Container } from "@material-ui/core";
import List from "../style/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { inputCart, amountIncrease } from "../redux/reducers/cart";

const Cart = () => {
  // 리덕스 테스트
  const cartitem = useSelector((state) => state.cartlist.cartlist);
  const dispatch = useDispatch();

  // 임시데이터 - 상품리스트(json)
  const [product, setProduct] = useState([
    {
      productID: 1,
      category: "Short Sleeve T-shirt",
      productName: "standard-fit",
      price: 9500,
      productImg: "상품이미지1",
    },
    {
      productID: 2,
      category: "Short Sleeve T-shirt",
      productName: "slim-fit",
      price: 9000,
      productImg: "상품이미지2",
    },
    {
      productID: 3,
      category: "long Sleeve T-shirt",
      productName: "standard-fit",
      price: 10000,
      productImg: "상품이미지3",
    },
  ]);
  
  // 임시데이터 - 장바구니(로컬스토리지)
  const [list, setList] = useState([
    {
      cartID: 1,
      productID: 1,
      color: "black",
      size: "S",
      print: "front",
      amount: 5,
      pay: 47500,
    },
    {
      cartID: 2,
      productID: 2,
      color: "navy",
      size: "M",
      print: "back",
      amount: 2,
      pay: 18000,
    },
    {
      cartID: 3,
      productID: 3,
      color: "white",
      size: "L",
      print: "front / back",
      amount: 3,
      pay: 30000,
    },
  ]);

  // 상품상세페이지(구매/장바구니 버튼)에서 로컬스토리지에 장바구니 데이터를 담았다고 가정
  // localStorage.setItem("moti_cartlist", JSON.stringify(list));

  // 로컬스토리지의 장바구니 데이터 들고오기
  const [cartlist, setCartlist] = useState([]);
  const [deliveryPay, setDeliveryPay] = useState(3000);
  // 대량 구매 할인을 할 것인지?
  // 얼마 이상 배송비 무료 할 것인지?
  // 숫자(금액) 세자리 마다 콤마 넣기

  // 로컬스토리지에서 값 들고오기
  useEffect(() => {
    const data = localStorage.getItem("moti_cartlist");
    setCartlist(data ? JSON.parse(data) : []);
  }, []);

  // 상품리스트에서 cartlist의 상품정보 찾기
  const findProduct = (i) => {
    return product.find((item) => item.productID == i.productID);
  };

  // 상품 총 금액 (배송비 제외), 총 구매수량
  const productTotal = () => {
    // 구매수량 삭제, 장바구니 아이템이 없으면 배송비 0 처리

    // prev: 이전값 > 현재까지 누적된 값
    // cur : 현재값
    // 0 : 초기값, 안쓰면 배열의 첫번째 요소가 들어감
    const totalPay = cartlist.reduce((prev, cur) => {
      return (prev += findProduct(cur).price * cur.amount);
    }, 0);
    const totalAmount = cartlist.reduce((prev, cur) => {
      return (prev += cur.amount);
    }, 0);
    return { pay: totalPay, amount: totalAmount };
  };

  // 상품 총 금액 (배송비 포함)
  const totalPay = () => {
    return productTotal().pay + deliveryPay;
  };

  // 장바구니 비우기
  const emptyCart = () => {
    setCartlist([]);
    setDeliveryPay(0);
    localStorage.removeItem("moti_cartlist");
  };

  return (
    <Container maxWidth="lg">
      {/** 리덕스 툴킷, 펄시스트 테스트
       *   <button onClick={() => {dispatch(inputCart());}}>장바구니 담기</button> */}
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
            <button onClick={emptyCart}>Clear All</button>
          </div>
        </li>
        {cartlist.length == 0 ? (
          <li className="product-empty">Empty</li>
        ) : (
          <>
            {cartlist.map((item) => (
              <CartItem
                key={item.cartID}
                item={item}
                cartlist={cartlist}
                setCartlist={setCartlist}
                findProduct={findProduct}
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
              <div>Total Price</div>
            </div>
            <div>
              <div>{productTotal().pay}</div>
              <div>{deliveryPay}</div>
              <div>{totalPay()}</div>
            </div>
          </div>
          <button>주문하기</button>
        </div>
      </Wrap>
      <div>
        <br />
        <br />
        주문하기 버튼을 누르면 모달창으로 주문완료 띄우기, 데이터는 orderlist로
        이동 <br />
        주문완료 모달창에는 홈으로 가기/주문내역 확인하기 버튼 <br />
        홈은 홈으로, 주문내역은 마이페이지로 이동
        <br />
        <br />
      </div>
    </Container>
  );
};

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
  margin-top: 3rem;
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
  }
`;
