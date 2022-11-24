import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => {navigate("/shop/" + product.id)}}
    >
      {product.name}
      <br />
      {product.price}
    </div>
  );
};

export default ProductCard;
