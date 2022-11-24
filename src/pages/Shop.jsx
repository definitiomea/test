import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  // 상품 상제 페이지 이동 확인을 위한 임시 데이터
  const [productlist, setProductlist] = useState([
    { id: 1, name: "상품 1", price: 10000 },
    { id: 2, name: "상품 2", price: 15000 },
    { id: 3, name: "상품 3", price: 20000 },
  ]);

  return (
    <div className="wrap">
      <h1>상품리스트</h1>
      <p>클릭하면 각 상품 상세 페이지로 이동</p>
      <div className="product-container">
        {productlist.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
