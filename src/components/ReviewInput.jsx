import { useDispatch } from "react-redux";

const CommentInput = () => {
  const dispatch=useDispatch()

  const comment=dispatch{(type)}

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

export default CommentInput;
