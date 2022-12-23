import { useDispatch, useSelector } from "react-redux";
import { inputOrder } from "../redux/reducers/order";
import {
  ADD_IMG,
  ADD_STAR,
  ADD_CONTENT,
} from "../redux/reducers/reviewInputReducer";

const ReviewInput = () => {
  const dispatch = useDispatch();
  // 로그인 유저 아이디정보
  const userID = useSelector((state) => state.user.id);
  // 구매티셔츠 정보
  const reviewProduct = useSelector((state) => state.orderlist.orderlist[2]);

  // 날짜정보
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;

  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>

      <div>
        <p>{dispatch(userID)}</p>
        <p>별점존</p>
        <p>{dispatch(reviewProduct.category)}</p>
        <p>{dispatch(reviewProduct.productName)}</p>
        <p>{dispatch(reviewProduct.size)}</p>
        <p>comment</p>
      </div>
      <div>
        <span>{dateStr}</span>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default ReviewInput;
