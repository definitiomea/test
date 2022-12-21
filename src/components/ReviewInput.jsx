import { useDispatch, useSelector } from "react-redux";
import { addReview, deleteReview } from "../redux/reducers/reviewInputReducer";

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
  console.log(typeof dateStr);
  return (
    <div>
      <div>
        {/* reviewInputReducer.js에서 가져옴 */}
        <img src="" alt="" />
      </div>

      <div>
        {/* user.js에서 가져옴 */}
        <p props={() => dispatch(addReview({ userID: userID }))}>{userID}</p>
        {/* reviewInputReducer.js에서 가져옴 */}
        <p>별점존</p>
        {/* order.js에서 가져옴 */}
        <p props={() => dispatch(addReview({ category: reviewProduct.category }))}>{reviewProduct.category}</p>
        <p>{reviewProduct.productName}</p>
        <p>{reviewProduct.size}</p>
        <p>comment</p>
      </div>
      <div>
        <span>{dateStr}</span>
        <button>수정</button>
        <button onClick={() => dispatch(deleteReview())}>삭제</button>
      </div>
    </div>
  );
};

export default ReviewInput;
