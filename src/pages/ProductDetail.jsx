import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fabric } from "fabric";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import FabricSettings from "../modules/FabricSettings";
import { initCanvas, handleImage, addText, setTextColor, exportImg, customSave, customErase } from "../modules/CanvasHandling";
import { QuantityOption } from "../modules/PageSetting";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

import { inputCart } from "../redux/reducers/cart";

const ProductDetail = () => {
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState(null);
  const [print, setPrint] = useState("front");
  const [editArray, setEditArray] = useState([]);

  const { id } = useParams(); // id : productList {id}

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

  /* 셔츠 뒤집기 */
  const flipShirts = () => {
    for (let i = 0; i < productList.productImg.length; i++) {
      if (img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
        setPrint("back");
      } else if (img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
        setPrint("front");
      }
    }
  };

  /* 셔츠 색상 바꾸기 */
  const changeShirtColor = (index) => {
    setImg(productList.productImg[index * 2]);
    setColor(productList.colorName[index]);
    setPrint("front");
    setEditArray([]);
  };

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
    <div className="product-area">
      <div className="product-button">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            flipShirts();
          }}
        >
          앞/뒤 뒤집기
        </Button>
        {/* <Button variant="contained" color="success" onClick={() => {add()}}>도형 생성</Button> */}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleImage({canvas, event});
          }}
        />
        {/* <Button variant="contained" color="success" onClick={() => {}}>사진 삭제</Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            addText({canvas});
          }}
        >
          텍스트 추가하기
        </Button>
        <input type="color" onChange={(event) => setTextColor({canvas, event})}></input>
        {/* <Button variant="contained" color="success">이미지 편집</Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.undo();
          }}
        >
          편집 되돌리기
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.redo();
          }}
        >
          편집 되돌리기 취소
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.clear();
          }}
        >
          이미지, 편집 전체 삭제
        </Button>
        {/* <Button onClick={() => {download()}}>시험용 다운로드</Button> */}
        <Button
          onClick={() => {
            exportImg({productList, editArray, setEditArray, dispatch, inputCart, color, quantitySelect, sizeSelect, productPrice});
          }}
        >
          이미지 내보내기(dispatch)
        </Button>
        <Button
          onClick={() => {
            customSave({editZone, editArray, setEditArray, img, setImg, print, setPrint, productList});
          }}
        >
          편집한 면의 이미지 저장
        </Button>
        <Button
          onClick={() => {
            customErase({setEditArray});
          }}
        >
          앞, 혹은 뒷면 이미지 편집 내역 지우기
        </Button>
      </div>

      <div className="product-detail" ref={editZone}>
        <div className="img-box">
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
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "350px",
              height: "420px",
            }}
          >
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>

      <div className="product-info">
        {productList ? <p>{productList.id}</p> : ""}
        {productList ? <p>{productList.productName}</p> : ""}
        {productList ? <p>{productList.price}</p> : ""}
        <div style={{ display: "flex" }}>
          {productList
            ? productList.color.map((color, index) => (
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    border: "1px solid transparent",
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    changeShirtColor(index);
                  }}
                  key={index}
                ></div>
              ))
            : ""}
        </div>

        <select style={{ width: "100px" }} ref={sizeSelect}>
          {productList?.size.map((size, index) => (
            <option key={index}>{size}</option>
          ))}
        </select>

        <select name="" id="" ref={quantitySelect}>
          <QuantityOption></QuantityOption>
        </select>

        <div>
          <Button>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
          </Button>
          <Button>구매하기</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
