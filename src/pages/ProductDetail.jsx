import "../css/product-custom-page.css"

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import FabricSettings from "../modules/FabricSettings";
import {
  initCanvas,
  handleImage,
  addText,
  setTextColor,
  exportImg,
  customSave,
  customErase,
} from "../modules/CanvasHandling";
import {
  QuantityOption,
  SizeOption,
  flipShirts,
  changeShirtColor,
} from "../modules/PageSetting";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faRepeat,
  faFont,
  faRotateLeft,
  faRotateRight,
  faEraser,
  faFloppyDisk,
  faCircleMinus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

import { inputCart } from "../redux/reducers/cart";

const ProductDetail = () => {
  const { id } = useParams(); // id : productList {id}

  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState(null);
  const [print, setPrint] = useState("front");
  const [editArray, setEditArray] = useState([]);

  const editZone = useRef(null);
  const sizeSelect = useRef(null);
  const quantitySelect = useRef(null);

  const dispatch = useDispatch();

  /* 셋팅 불러오기 */
  FabricSettings();

  /* 각각의 티셔츠 받아오기 */
  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  /* 제품의 가격 */
  const productPrice = parseInt(productList?.price.replace(",", ""));

  /* 페이지가 로딩되면 제품 정보를 받고, 캔버스를 정해주면 되므로 */
  useEffect(() => {
    getProduct();
    setCanvas(initCanvas());
  }, [id]);

  /* 제품 정보가 로딩되면 기본 이미지와 기본 색상 정보가 있어야 하므로 */
  useEffect(() => {
    if (productList != null) {
      setImg(productList.productImg[0]);
      setColor(productList.colorName[0]);
    }
  }, [productList]);

  return (
    <>
      <div className="product-shopping-area">
        <div className="product-area">
          <div className="product-handling-buttons">
            <FontAwesomeIcon
              icon={faRepeat}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                flipShirts({ productList, img, setImg, setPrint });
              }}
            >
              앞/뒤 뒤집기
            </Button>
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleImage({ canvas, event });
              }}
            />
            <FontAwesomeIcon
              icon={faFont}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  addText({ canvas });
                }}
              >
                텍스트 추가하기
              </Button>
              <input
                type="color"
                onChange={(event) => setTextColor({ canvas, event })}
              ></input>
            </div>
            <FontAwesomeIcon
              icon={faRotateLeft}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                canvas.undo();
              }}
            >
              편집 되돌리기
            </Button>
            <FontAwesomeIcon
              icon={faRotateRight}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                canvas.redo();
              }}
            >
              편집 되돌리기 취소
            </Button>
            <FontAwesomeIcon
              icon={faEraser}
              style={{ width: "30px", height: "30px" }}
            ></FontAwesomeIcon>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                canvas.clear();
              }}
            >
              이미지, 편집 전체 삭제
            </Button>
          </div>
          <div className="product-create-area">
            <div className="img-box" ref={editZone}>
              {productList?.category == "short" && img != null ? (
                <img
                  className="product-img"
                  src={require(`../img/shirts-img/short/${img}`)}
                ></img>
              ) : (
                ""
              )}
              {productList?.category == "long" && img != null ? (
                <img
                  className="product-img"
                  src={require(`../img/shirts-img/long/${img}`)}
                ></img>
              ) : (
                ""
              )}
              <div className="drawing-area">
                <canvas id="canvas"></canvas>
              </div>
            </div>
            <div className="product-important-handling-button">
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ width: "30px", height: "30px" }}
              ></FontAwesomeIcon>
              <Button
                onClick={() => {
                  customSave({
                    editZone,
                    editArray,
                    setEditArray,
                    img,
                    setImg,
                    print,
                    setPrint,
                    productList,
                  });
                }}
              >
                편집한 면의 이미지 저장
              </Button>
              <FontAwesomeIcon
                icon={faCircleMinus}
                style={{ width: "30px", height: "30px" }}
              ></FontAwesomeIcon>
              <Button
                onClick={() => {
                  customErase({ setEditArray });
                }}
              >
                앞, 혹은 뒷면 이미지 편집 내역 지우기
              </Button>
            </div>
          </div>
        </div>
        <div className="product-info-area">
          <div className="product-info">
            <div className='product-introduce'>
              {productList ? <p>{productList.id}</p> : ""}
              {productList ? <p>{productList.productName}</p> : ""}
              {productList ? <p>{productList.price}</p> : ""}
            </div>
            <div className="product-color-setter-area">
              {productList
                ? productList.color.map((color, index) => (
                    /* 얘는 배열에서 color 요소를 바로 받아감, className X */
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        border: "1px solid transparent",
                        borderRadius: "50%",
                        backgroundColor: color,
                        margin: '1vw 1vh'
                      }}
                      onClick={() => {
                        changeShirtColor({
                          productList,
                          setImg,
                          setColor,
                          setPrint,
                          setEditArray,
                          index,
                        });
                      }}
                      key={index}
                    ></div>
                  ))
                : ""}
            </div>
            <select className='product-size-select' ref={sizeSelect}>
              <SizeOption productList={productList}></SizeOption>
            </select>
            <select className="product-quantity-select" name="" id="" ref={quantitySelect}>
              <QuantityOption></QuantityOption>
            </select>
          </div>
          <div className="product-add-cart">
            <Button
              onClick={() => {
                exportImg({
                  productList,
                  editArray,
                  setEditArray,
                  dispatch,
                  inputCart,
                  color,
                  quantitySelect,
                  sizeSelect,
                  productPrice,
                });
              }}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                style={{ width: "30px", height: "30px" }}
              ></FontAwesomeIcon>
            </Button>
            <Button>구매하기</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

const DrawingArea = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  z-index: 10;
  width: 180px;
  height: 260px;
  /* &:hover와 같이 CSS 이벤트 가능 */
  &:hover {
    outline: 1px dashed black;
  }
`;

const ProductArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
