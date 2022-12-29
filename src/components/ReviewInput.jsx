import { useDispatch, useSelector } from "react-redux";
import {
  inputReview,
  deleteReview,
} from "../redux/reducers/reviewInputReducer";
import { loginUser } from "../redux/reducers/user";

const ReviewInput = () => {
  // 로그인 유저 아이디정보
  const userName = useSelector((state) => state.user);
  // 구매티셔츠 정보
  const reviewProduct = useSelector((state) => state.orderlist.orderlist[2]);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {/* reviewInputReducer.js에서 가져옴 */}
        <img src="" alt="" />
      </div>

      <div>
        <h1>고객</h1>
        {/* user.js에서 가져옴 */}
        <span>{userName.user}</span>
        {/* reviewInputReducer.js에서 가져옴 */}
        <span>별점존</span>
        {/* order.js에서 가져옴 */}
        <span>{reviewProduct.category}</span>
        <span>{reviewProduct.productName}</span>
        <span>({reviewProduct.color})</span>
        <span>{reviewProduct.size}</span>
        <span>comment</span>
      </div>

      <div>
        {/* 리뷰 등록날짜 정보 */}
        <span></span>
        <button>수정</button>
        <button onClick={() => dispatch(deleteReview())}>삭제</button>
      </div>
    </div>
  );
};

export default ReviewInput;
