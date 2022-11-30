import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  // 상품 상제 페이지 이동 확인을 위한 임시 데이터가 전역값이 아니라 가져옴
  /* const [productlist, setProductlist] = useState([
    { id: 1, name: "상품 1", price: 10000 },
    { id: 2, name: "상품 2", price: 15000 },
    { id: 3, name: "상품 3", price: 20000 },
  ]);

  const getProduct = () => {
    return productlist.find((product) => (product.id == id));
  } */

  const { id } = useParams(); // id : productlist {id}

  useEffect(() => {
    dispatch(productAction.getProduct());
    console.log(product);
  },[]);

  return (
    <div className="wrap">
      <h1>상품 디테일 페이지</h1>
      <div>
        {product ? <p>{product.id}</p> : ""}
        {product ? <p>{product.productName}</p> : ""}
        {product ? <p>{product.price}</p> : ""}
      </div>
    </div>
  );
}
 
export default ProductDetail;