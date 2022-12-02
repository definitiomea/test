import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
/* import { useDispatch, useSelector } from "react-redux"; */
/* import { productAction } from "../redux/actions/productAction"; */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
/* import Slider from "react-slick"; */

const ProductDetail = () => {
  /* const dispatch = useDispatch();
  const product = useSelector((state) => state.product); */

  // 상품 상제 페이지 이동 확인을 위한 임시 데이터가 전역값이 아니라 가져옴
  /* const [productlist, setProductlist] = useState([
    { id: 1, name: "상품 1", price: 10000 },
    { id: 2, name: "상품 2", price: 15000 },
    { id: 3, name: "상품 3", price: 20000 },
  ]); */

  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [cvsAct, setCvsAct] = useState(false);

  const cvs = useRef(null);

  const { id } = useParams(); // id : productlist {id}

  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(()=>{
    if(productList != null) {
      setImg(productList.productImg[0])
    }
  }, [productList])

  const flipShirts = () => {
    for(let i = 0; i < productList.productImg.length; i++) {
      if(img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
      }
      else if(img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
      }
    }
  }

  const readyCanvas = () => {
    setCvsAct(true);
    cvs.current.backgroundColor = "#FFFFFF";
    cvs.current.width = "200px";
    cvs.current.height = "200px";
  }

  return (
    <div className="product-area">
      <div className="product-button">
        <Button variant="contained" color="success" onClick={() => {flipShirts()}}>앞/뒤</Button>
        <Button variant="contained" color="success" onClick={() => {readyCanvas()}}>사진 업로드</Button>
        <Button variant="contained" color="success">사진 삭제</Button>
        <Button variant="contained" color="success">텍스트</Button>
        <Button variant="contained" color="success">이미지 편집</Button>
      </div>
        <div className="product-detail">
        {productList?.category == "short" && img != null ?
          <div className="img-box">
            <img className="product-img" src={require(`../img/shirts-img/short/${img}`)}></img>
            {cvsAct ? <canvas ref={cvs}></canvas> : ""}
          </div> : 
        ""}
        {productList?.category == "long" && img != null ?
          <div className="img-box">
            <img className="product-img" src={require(`../img/shirts-img/long/${img}`)}></img>
            {cvsAct ? <canvas ref={cvs}></canvas> : ""}
          </div> : 
        ""}
        </div>
        <div>
            {productList ? <p>{productList.id}</p> : ""}
            {productList ? <p>{productList.productName}</p> : ""}
            {productList ? <p>{productList.price}</p> : ""}
            <div style={{display: "flex"}}>
              {productList ? productList.color.map((color, index) => 
                <div style={{width: "15px", height: "15px", border: "1px solid transparent", borderRadius: "50%", backgroundColor: color}} onClick={() => {setImg(productList.productImg[index * 2])}} key={index}></div>) :
              ""}
            </div>

            <select style={{width: "100px"}}>
              {productList?.size.map((size, index) => <option key={index}>{size}</option>)}
            </select>

            <div>
              <Button><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon></Button>
              <Button>구매하기</Button>
            </div>
            

            {/* 원하는 객체가 있는지 삼항 연산자, 콘솔로 찍어봤을 때
            거짓 경우(객체 로딩 중) -> 참 경우(객체 로딩 완료)로 넘어가면서
            둘 다가 찍힌다.
            
            그래서, 로딩 되기 전의 거짓 경우와 로딩 되었을 때의 참 경우 둘 다가 필요하고,
            객체가 있는지를 "?"를 통해 한번 더 체크해야 한다. */}

            {productList ? console.log("OK") : console.log("not yet")}
        </div>
    </div>
  );
}
 
export default ProductDetail;