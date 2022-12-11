import styled from "styled-components";
import { useRef } from "react";

const CartItem = (props) => {
  const { cartItem, productlist } = props; // CartBox
  const inputRef = useRef();

  // 상품리스트에서 cartlist의 상품정보 찾기
  const findProduct = (cartItem) => {
    return productlist.find(
      (productItem) => productItem.productID == cartItem.productID
    );
  };

  // 상품별 총 금액
  const subTotalPrice = (cartItem) => {
    const priceStr = findProduct(cartItem).price;
    const price = parseInt(priceStr.replace(",", "")); // 콤마 제거, 문자열 > 숫자형
    const totalPrice = price * cartItem.quantity;
    return totalPrice.toLocaleString("ko-KR"); // 콤마 추가
  };

  // 상품이미지
  const getCategory = (cartItem) => {
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
        <div className="img">{getCategory(findProduct(cartItem))}</div>
        <div>
          <div>{findProduct(cartItem).category}</div>
          <div>
            {`${findProduct(cartItem).productName} (${cartItem.color})`}
          </div>
          {/** print는 데이터 형태 확인할 것(수정 가능성 있음) */}
          <div>print : {cartItem.print}</div>
        </div>
      </StyledProduct>
      <div>{cartItem.size}</div>
      <div>
        <button>-</button>
        <input type="number" defaultValue={cartItem.quantity} ref={inputRef} />
        <button>+</button>
      </div>
      <div>{subTotalPrice(cartItem)}</div>
      <button>X</button>
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
