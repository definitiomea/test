import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


const ProductCard = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  const color = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: i => (
      <div
        style={{
          width: "10px",
          height: "10px",
          color: color[i],
          border: `1px solid transparent`,
          borderRadius: "50%",
          backgroundColor: color[i],
          zIndex: 1
        }}
      >
        {/* {i + 1} */}
      </div>
    )
  };

  return (
    <div
      className="product-card"
    >
      <Slider {...settings}>
        <p onClick={() => {navigate("/shop/" + product.id)}}>
          {product.name}
          <br />
          {product.price}
        </p>
        <p onClick={() => {navigate("/shop/" + product.id)}}>
          {product.name}
          <br />
          {product.price}
        </p>
        <p onClick={() => {navigate("/shop/" + product.id)}}>
          {product.name}
          <br />
          {product.price}
        </p>
        <p onClick={() => {navigate("/shop/" + product.id)}}>
          {product.name}
          <br />
          {product.price}
        </p>
        <p onClick={() => {navigate("/shop/" + product.id)}}>
          {product.name}
          <br />
          {product.price}
        </p>
      </Slider>
    </div>
  );
};

export default ProductCard;
