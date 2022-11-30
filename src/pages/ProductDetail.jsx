import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";

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

  const { id } = useParams(); // id : productlist {id}

  const getProduct = async () => {
    let url = `http://localhost:5000/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  }

  useEffect(() => {
    /* dispatch(productAction.getProduct());
    console.log(product); */
    getProduct();
  },[id]);

  return (
    <div className="wrap">
      <h1>상품 디테일 페이지</h1>
      <div>
        {productList ? <p>{productList.id}</p> : ""}
        {productList ? <p>{productList.productName}</p> : ""}
        {productList ? <p>{productList.price}</p> : ""}

        {/* 원하는 객체가 있는지 삼항 연산자, 콘솔로 찍어봤을 때
        거짓 경우(객체 로딩 중) -> 참 경우(객체 로딩 완료)로 넘어가면서
        둘 다가 찍힌다.
        
        그래서, 로딩 되기 전의 거짓 경우와 로딩 되었을 때의 참 경우 둘 다가 필요하고,
        객체가 있는지를 "?"를 통해 한번 더 체크해야 한다. */}

        {productList ? console.log("OK") : console.log("not yet")}
        {productList?.category == "short" ?
        <img src={require(`../img/shirts-img/short/${productList.productImg[0]}`)} style={{maxWidth: "30%"}}></img> : 
        ""}
        {productList?.category == "long" ?
        <img src={require(`../img/shirts-img/long/${productList.productImg[0]}`)} style={{maxWidth: "30%"}}></img> : 
        ""}
      </div>
    </div>
  );
}
 
export default ProductDetail;