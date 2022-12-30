import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../css/Shop.css";

const Shop = () => {
  const [thumbNailList, setThumbNailList] = useState(null);
  const [category, setCategory] = useState("short");

  const getThumbNailList = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList`;
    let response = await fetch(url);
    let data = await response.json();
    setThumbNailList(data);
  };

  useEffect(
    () => {
      getThumbNailList();
    },
    [
      /* thumbNailList, 이렇게 되면 state에 따라 무한 렌더링된다. */
    ]
  );

  return (
    <div className="shop-wrap">
      <div className="shop-border-area">
        <div className="shop-label">
          <h1 className="shop-title">Product List</h1>
          <div className="shop-select-category">
            <div
              className="shop-category"
              onClick={() => {
                setCategory("short");
              }}
            >
              Short
            </div>
            <div
              className="shop-category"
              onClick={() => {
                setCategory("long");
              }}
            >
              Long
            </div>
          </div>
        </div>
        <div className="shop-thumNail-list">
          {/* {thumbNailList?.map((thumbNail) => (
            <div key={thumbNail.id}>
              <ProductCard thumbNail={thumbNail} />
            </div>
          ))} */}
          {category === "short"
            ? thumbNailList
                ?.filter((thumbNail) => thumbNail.id < 4)
                .map((thumbNail, index) => <ProductCard key={thumbNail.id} thumbNail={thumbNail} />)
            : ""}
          {category === "long"
            ? thumbNailList
                ?.filter((thumbNail) => thumbNail.id >= 4)
                .map((thumbNail, index) => <ProductCard key={thumbNail.id} thumbNail={thumbNail} />)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Shop;
