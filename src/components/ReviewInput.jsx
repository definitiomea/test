import { useDispatch } from "react-redux";

const ReviewInput = (props) => {
  const { productID } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <p>
        <strong>후기</strong>
      </p>
      <span>userID</span>
      <br />
      <span>category</span>
      <br />
      <span>productName</span>
      <br />
      <span>size</span>
      <br />
      <p>comment </p>
      <img src="" alt="" />
      <span>date</span>
    </div>
  );
};

export default ReviewInput;
