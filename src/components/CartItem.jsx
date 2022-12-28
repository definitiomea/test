import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../css/cart-style.css";

import {
  quantityIncrease,
  quantityDecrease,
  quantityInput,
  deleteItem,
} from "../redux/reducers/cart";
import { useRef, useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "80%",
  maxHeight: "80%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserDesignModal = ({ userImg }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="cart-modal">
      <Button variant="outlined" color="inherit" onClick={handleOpen}>
        도안확인
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {userImg.map((item, i) => (
            <div key={i}>
              <div>{item.print}</div>
              <img src={item.imageUrl} alt="No Image" />
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

const CartItem = (props) => {
  const { cartItem, productlist, dispatch } = props; // Cart.jsx
  const [totalPay, setTotalPay] = useState(cartItem.totalPay);
  // 상품리스트에서 장바구니에 담긴 아이템들의 상품정보 찾기
  const product = productlist.find(
    (productItem) => productItem.productID == cartItem.productID
  );
  const price = parseInt(product.price.replace(",", ""));
  const [userImg, setUserImg] = useState([]);
  // 구매수량이 바뀔 때마다 반영하기 위한 ref
  const inputRef = useRef();

  // 구매 수량 변경 : +1 , -1, 직접입력
  const onDecrease = () => {
    dispatch(
      quantityDecrease({
        cartID: cartItem.cartID,
        productPrice: price,
      })
    );
  };
  const onIncrease = () => {
    dispatch(
      quantityIncrease({
        cartID: cartItem.cartID,
        productPrice: price,
      })
    );
  };
  const onInput = (e) => {
    dispatch(
      quantityInput({
        cartID: cartItem.cartID,
        productPrice: price,
        value: e.target.value,
      })
    );
  };

  // 상품 이미지 경로
  const getImgPath = () => {
    const findIndex = product.colorName.findIndex(
      (item) => item === cartItem.color
    );
    switch (product.category) {
      case "short":
        return require(`../img/shirts-img/short/${product.thumbnail[findIndex]}`);
      case "long":
        return require(`../img/shirts-img/long/${product.thumbnail[findIndex]}`);
      default:
        return undefined;
    }
  };

  // 장바구니 아이템의 ImgArr(사용자 도안 배열)을 print: front - back 순으로 정렬
  useEffect(() => {
    if (cartItem.imgArray.length === 2) {
      const newArr =
        cartItem.imgArray[0].print == "back"
          ? cartItem.imgArray.slice(0).reverse()
          : cartItem.imgArray;
      setUserImg(newArr);
    } else {
      setUserImg(cartItem.imgArray);
    }
  }, []);

  // 구매 수량이 바뀔 때마다 input과 totalPay에 반영
  useEffect(() => {
    inputRef.current.value = cartItem.quantity;
    setTotalPay(cartItem.totalPay);
  }, [cartItem.quantity]);

  return (
    <>
      <td className="table-product-container">
        <img src={getImgPath()} alt="No Image" />
        <div>
          <div>
            {product.category} {product.productName} ({cartItem.color})
          </div>
          <div>
            print :
            {userImg.length === 2 ? (
              <span>
                {userImg[0]?.print} / {userImg[1]?.print}
              </span>
            ) : (
              <span>{userImg[0]?.print}</span>
            )}
          </div>
          <UserDesignModal userImg={userImg} />
        </div>
      </td>
      <td>{cartItem.size}</td>
      <td className="quantity-container">
        <IconButton onClick={onDecrease}>
          <RemoveIcon />
        </IconButton>
        <input
          type="number"
          defaultValue={cartItem.quantity}
          ref={inputRef}
          onChange={onInput}
        />
        <IconButton onClick={onIncrease}>
          <AddIcon />
        </IconButton>
      </td>
      <td>{totalPay.toLocaleString("ko-KR")}</td>
      <td>
        <IconButton
          onClick={() => {
            dispatch(deleteItem(cartItem.cartID));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </td>
    </>
  );
};

export default CartItem;
