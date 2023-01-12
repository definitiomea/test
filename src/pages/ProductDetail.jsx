import "../css/product-custom-page.css";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import FabricSettings from "../modules/FabricSettings";
import { initCanvas, initSmallCanvas, handleImage, addText, setTextColor, exportImg, customSave, customErase } from "../modules/CanvasHandling";
import { QuantityOption, SizeOption, flipShirts, changeShirtColor } from "../modules/PageSetting";

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
  faCircleQuestion,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
/* import Box from "@mui/material/Box"; */
import Button from "@mui/material/Button";
/* import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography"; */

import { inputCart } from "../redux/reducers/cart";
import LongProductInfo from "../components/LongProductInfo";
import ShortProductInfo from "../components/ShortProductInfo";
import ReviewList from "../components/ReviewList";
import ReviewInput from "../components/ReviewInput";
import ProduceModal from "../components/ProduceModal";

const ProductDetail = () => {
  const { id } = useParams(); // id : productList {id}

  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState(null);
  const [print, setPrint] = useState("front");
  const [editArray, setEditArray] = useState([]);
  
  const [currentWidth, setCurrentWidth] = useState(window.currentWidth)

  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  /* 페이지가 로딩되면 제품 정보를 받고, 캔버스를 정해주면 되므로 */
  useEffect(() => {
    getProduct();
    console.log(window.outerWidth)
    if(window.outerWidth >= 768) {
      setCanvas(initCanvas());
    }
    else {
      setCanvas(initSmallCanvas());
    }
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
      <div className="producing-title-area">
        <h1 className="producing-title">producing</h1>
        <div className="producing-title-line"></div>
      </div>
      <div className="product-shopping-area">
        <div className="product-area">
          <div className="product-handling-buttons">
            <div className="product-handling-button-element">
              <FontAwesomeIcon
                icon={faRepeat}
                title="앞/뒤 뒤집기"
                onClick={() => {
                  flipShirts({ productList, img, setImg, setPrint });
                }}
              ></FontAwesomeIcon>
              <label className="handling-explane">앞/뒤 뒤집기</label>
            </div>
            <label htmlFor="input-file" className="product-handling-button-element">
              <FontAwesomeIcon icon={faCloudArrowUp} style={{}}></FontAwesomeIcon>
              <span className="handling-explane" style={{ fontSize: "0.75em" }}>
                업로드
              </span>
            </label>
            {/* </div> */}
            <input
              type="file"
              accept="image/*"
              id="input-file"
              style={{ display: "none" }}
              onChange={(event) => {
                handleImage({ canvas, event });
              }}
            />
            <div className="product-text-handling">
              <div className="product-handling-button-element">
                <FontAwesomeIcon
                  icon={faFont}
                  title="텍스트 추가"
                  onClick={() => {
                    addText({ canvas });
                  }}
                ></FontAwesomeIcon>
                <label className="handling-explane">텍스트 추가</label>
              </div>
              <div className="product-handling-button-element">
                <input type="color" title="텍스트 색상 바꾸기" onChange={(event) => setTextColor({ canvas, event })}></input>
                <label className="handling-explane">텍스트 색상</label>
              </div>
            </div>
            <div className="product-handling-button-element">
              <FontAwesomeIcon
                icon={faRotateLeft}
                title="편집 취소"
                onClick={() => {
                  canvas.undo();
                }}
              ></FontAwesomeIcon>
              <label className="handling-explane">편집 취소</label>
            </div>
            <div className="product-handling-button-element">
              <FontAwesomeIcon
                icon={faRotateRight}
                title="다시 실행"
                onClick={() => {
                  canvas.redo();
                }}
              ></FontAwesomeIcon>
              <label className="handling-explane">다시 실행</label>
            </div>
            <div className="product-handling-button-element">
              <FontAwesomeIcon
                icon={faEraser}
                title="편집 전체 지우기"
                onClick={() => {
                  canvas.clear();
                }}
              ></FontAwesomeIcon>
              <label className="handling-explane">편집 초기화</label>
            </div>
          </div>
          <div className="product-create-area">
            <div className="img-box" ref={editZone}>
              {productList?.category == "short" && img != null ? (
                <img className="product-img" src={require(`../img/shirts-img/short/${img}`)}></img>
              ) : (
                ""
              )}
              {productList?.category == "long" && img != null ? (
                <img className="product-img" src={require(`../img/shirts-img/long/${img}`)}></img>
              ) : (
                ""
              )}
              <div className="drawing-area">
                <canvas id="canvas"></canvas>
              </div>
            </div>
            <div className="product-important-handling-button">
              <div className="product-handling-button-element">
                <div style={{ margin: "0em auto" }}>
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    title="편집한 이미지 저장"
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
                  ></FontAwesomeIcon>
                </div>
                <label className="handling-explane">편집 이미지 저장</label>
              </div>
              <div className="product-handling-button-element">
                <div style={{ margin: "0em auto" }}>
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    title="이미지 저장 내역 지우기"
                    onClick={() => {
                      customErase({ setEditArray });
                    }}
                  ></FontAwesomeIcon>
                </div>
                <label className="handling-explane">편집한 이미지 지우기</label>
              </div>
              <div className="product-handling-button-element">
                <div style={{ margin: "0em auto" }}>
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    title="이미지 편집 방법"
                    onClick={() => {
                      handleOpen(true);
                    }}
                  ></FontAwesomeIcon>
                </div>
                <label className="handling-explane">이미지 편집 방법</label>
              </div>
            </div>
          </div>
        </div>
        <div className="product-info-area">
          <div className="product-info">
            <div className="product-introduce">
              {/* {productList ? <p>{productList.id}</p> : ""} */}
              {productList ? <p>{productList.productName}</p> : ""}
              {productList ? (
                <p>
                  <b>{productList.price}</b> 원
                </p>
              ) : (
                ""
              )}
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
                        margin: "1vw 1vh",
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
            <select className="product-size-select" ref={sizeSelect}>
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
              <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
            </Button>
            <label className="add-to-cart">장바구니 담기</label>
          </div>
        </div>
      </div>
      {productList?.id >= 4 ? <LongProductInfo></LongProductInfo> : ""}
      {productList?.id < 4 ? <ShortProductInfo></ShortProductInfo> : ""}
      <ProduceModal open={open} setOpen={setOpen}></ProduceModal>
      <div>
        {/* 더미 리뷰리스트 출력 */}
        {productList ? <ReviewList compare={productList} /> : ""}
        {/*
         * 고객이 작성한 리뷰 출력
         * - 페이지 ReviewAdd에서 작성되고, 컴포넌트 ReviewInput에 출력 폼 있음
         */}
        {productList ? <ReviewInput id={id} /> : ""}
      </div>
    </>
  );
};

export default ProductDetail;
