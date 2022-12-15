import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fabric } from "fabric";
import "fabric-history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import CommentInput from "../components/ReviewInput";
import CommentList from "../components/CommentList";
import styled from "@emotion/styled";

const ProductDetail = () => {
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const { id } = useParams(); // id : productList {id}

  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  let deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  let delImg = new Image();
  delImg.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "blue";
  fabric.Object.prototype.cornerStyle = "circle";

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24,
  });

  function deleteObject(eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    let size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(delImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const flipShirts = () => {
    for (let i = 0; i < productList.productImg.length; i++) {
      if (img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
      } else if (img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
      }
    }
  };

  const add = () => {
    let rect = new fabric.Rect({
      left: 60,
      top: 50,
      fill: "yellow",
      width: 100,
      height: 100,
      objectCaching: false,
      stroke: "lightgreen",
      strokeWidth: 4,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
  };

  let test = "https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=lA8UuoHt";
  let backImg = new Image();
  backImg.src = test;

  const initCanvas = () => {
    return new fabric.Canvas("canvas", {
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      backgroundImage: new fabric.Image(backImg),
    });
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (productList != null) {
      setImg(productList.productImg[0]);
    }
  }, [productList]);

  console.log(canvas);

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
          앞/뒤
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            add();
          }}
        >
          사진 업로드
        </Button>
        <Button variant="contained" color="success" onClick={() => {}}>
          사진 삭제
        </Button>
        <Button variant="contained" color="success">
          텍스트
        </Button>
        <Button variant="contained" color="success">
          이미지 편집
        </Button>
      </div>
      <div className="product-detail">
        {productList?.category == "short" && img != null ? (
          <div className="img-box">
            <img className="product-img" src={require(`../img/shirts-img/short/${img}`)}></img>
          </div>
        ) : (
          ""
        )}

        {productList?.category == "long" && img != null ? (
          <div className="img-box">
            <img className="product-img" src={require(`../img/shirts-img/long/${img}`)}></img>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <canvas id="canvas"></canvas> */}
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
                    setImg(productList.productImg[index * 2]);
                  }}
                  key={index}
                ></div>
              ))
            : ""}
        </div>

        <select style={{ width: "100px" }}>
          {productList?.size.map((size, index) => (
            <option key={index}>{size}</option>
          ))}
        </select>

        <div>
          <Button>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
          </Button>
          <Button>구매하기</Button>
        </div>
        {/* 원하는 객체가 있는지 삼항 연산자, 콘솔로 찍어봤을 때
            거짓 경우(객체 로딩 중) -> 참 경우(객체 로딩 완료)로 넘어가면서
            둘 다가 찍힌다.
            
            그래서, 로딩 되기 전의 거짓 경우와 로딩 되었을 때의 참 경우 둘 다가 필요하고,
            객체가 있는지를 "?"를 통해 한번 더 체크해야 한다. */}
      </div>

      {/* 리뷰공간 */}
      <div>
        <CommentList />
        <CommentInput productID={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
