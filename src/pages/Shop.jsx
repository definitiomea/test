import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  // 상품 상제 페이지 이동 확인을 위한 임시 데이터
  /* const [productlist, setProductlist] = useState([
    { id: 1, name: "상품 1", price: 10000 },
    { id: 2, name: "상품 2", price: 15000 },
    { id: 3, name: "상품 3", price: 20000 },
  ]); */

  const [thumbNailList, setThumbNailList] = useState(null);

  const getThumbNailList = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList`;
    let response = await fetch(url);
    let data = await response.json();
    setThumbNailList(data);
  }

  useEffect(() => {
    getThumbNailList()
  }, [thumbNailList]);

  return (
    <div className="wrap">
      <h1>상품리스트</h1>
      <p>클릭하면 각 상품 상세 페이지로 이동</p>
      <div className="product-container">
        {thumbNailList?.map((thumbNail) => (
          <div key={thumbNail.id}>
            <ProductCard thumbNail={thumbNail} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
