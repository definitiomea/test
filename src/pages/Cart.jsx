import styled from "styled-components";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { inputCart, amountIncrease } from "../redux/reducers/cart";

const Cart = () => {
  // 리덕스 테스트
  const count = useSelector((state) => state.cartlist.id);
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
    <Wrap>
      {/** 리덕스 툴킷, 펄시스트 테스트 */}
      <h1>{count}</h1>
      <button onClick={() => {dispatch(amountIncrease());}}> +1 </button>
      <button onClick={() => {dispatch(inputCart());}}> 장바구니 담기 </button>
      <h2>My Cart</h2>
      <Label>
        <div>Product Name</div>
        <div>Size</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Remove</div>
      </Label>
      {cartlist.length == 0 ? (
        <Item>
          <div className="empty-cart">Empty</div>
        </Item>
      ) : (
        <Item>
          {cartlist.map((item) => (
            <CartItem
              key={item.cartID}
              item={item}
              cartlist={cartlist}
              setCartlist={setCartlist}
              findProduct={findProduct}
            />
          ))}
        </Item>
      )}
      <Total>
        <div>
          <div>Subtotal</div>
          <div>Delivery</div>
          <div className="total">Total Price</div>
        </div>
        <div>
          <div>{productTotal().pay}</div>
          <div>{deliveryPay}</div>
          <div className="total">{totalPay()}</div>
        </div>
      </Total>
      <br />
      <button onClick={emptyCart}>장바구니 비우기</button>
      <button>주문하기</button>
      <div>
        <h2>배송지 정보</h2>
        배송지 직접 입력하는 공간 <br />
        저장된 배송지 정보 불러오는 버튼 <br />
        저장된 배송지가 있다면 자동으로 채워준다(컴포넌트 빼기)
      </div>
      <div>
        <br />
        주문하기 버튼을 누르면 모달창으로 주문완료 띄우기, 데이터는 orderlist로
        이동 <br />
        주문완료 모달창에는 홈으로 가기/주문내역 확인하기 버튼 <br />
        홈은 홈으로, 주문내역은 마이페이지로 이동
      </div>
    </Wrap>
  );
};

export default Cart;

// 글로벌 스타일로 빼기
const Wrap = styled.div`
  width: 90%;
  max-width: 1080px;
  margin: 3rem auto;
  ${"h2"} {
    margin: 2rem 0;
    font-weight: bold;
  }
  // 미디어쿼리 - width
`;

// 글로벌 스타일로 빼기
const Label = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr 2fr;
  gap: 1.5rem;
  align-items: center;
  justify-items: center;
  padding: 1.2rem 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  // 미디어쿼리 - grid-template-columns
`;

const Item = styled(Label)`
  min-height: 180px;
  border: none;
  font-weight: normal;
  text-align: center;
  .empty-cart {
    grid-column: 1 / 6;
    color: lightgray;
  }
  ${"input"} {
    max-width: 4rem;
  }
`;

const Total = styled(Label)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: normal;
  font-size: 1.2rem;
  ${"div"} {
    &:first-child {
      grid-column: 1 / 3;
      justify-self: start;
    }
    &:last-child {
      grid-column: 3 / 6;
      justify-self: end;
      ${"div"} {
        text-align: right;
      }
    }
    .total {
      margin-top: 1rem;
      color: #f44336;
    }
  }
  // 미디어 쿼리 - 패딩
`;
