import styled from "styled-components";
import List from "../style/List";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {} from "../redux/reducers/cart";

// 대량 구매 할인을 할 것인지?
// 얼마 이상 배송비 무료 할 것인지?
// 숫자(금액) 세자리 마다 콤마 넣기

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
                <button>Clear All</button>
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
                  />
                ))}
              </>
            )}
          </List>
          {/** 배송지, 총금액 */}
        </>
      ) : (
        <h1>now loading(컴포넌트 만들기)</h1>
      )}
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
