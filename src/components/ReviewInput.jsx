import { useDispatch, useSelector } from "react-redux";
import {
  inputReview,
  deleteReview,
} from "../redux/reducers/reviewInputReducer";
import { loginUser } from "../redux/reducers/user";

const ReviewInput = () => {
  const dispatch = useDispatch();
  // 로그인 유저 아이디정보
  const userName = useSelector((state) => state.user);
  // 구매티셔츠 정보
  const reviewProduct = useSelector((state) => state.orderlist.orderlist[2]);


  return (
    <div>
      <div>
        {/* reviewInputReducer.js에서 가져옴 */}
        <img src="" alt="" />
      </div>

      <div>
        {/* user.js에서 가져옴 */}
        <p>{userName.user}</p>
        {/* reviewInputReducer.js에서 가져옴 */}
        <p>별점존</p>
        {/* order.js에서 가져옴 */}
        <p>
          {reviewProduct.category}
        </p>
        <p>{reviewProduct.productName}</p>
        <p>{reviewProduct.size}</p>
        <p>comment</p>
      </div>
      <div>
        {/* 히뷰 등록날짜 정보 */}
        <span></span>
        <button>수정</button>
        <button onClick={() => dispatch(deleteReview())}>삭제</button>
      </div>
    </div>
  );
};

export default ReviewInput;
