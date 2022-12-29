import { useDispatch, useSelector } from "react-redux";
import {
  inputReview,
  deleteReview,
} from "../redux/reducers/reviewInputReducer";

const ReviewInput = () => {
  // 구매티셔츠 정보, 리뷰정보
  const reviewFile = useSelector((state) => state.reviewInput.reviewlist);
  // console.log(reviewFile);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{/* reviewInputReducer.js에서 가져옴 */}</div>

      <div>
        <h1>고객</h1>
        {}
        {reviewFile.map((review) => (
          <div>
            {/* 이미지가 첨부되면 첨부파일을 출력, 첨부하지 않으면 상품 썸네일을 출력 */}
            {/* {img ? 
            (<img src={reviewFile[0].img} alt=""  style={{width:"100px",height:"100px"}}>)
            :
            (<img src={review.productImg} alt=""  style={{width:"100px",height:"100px"}}/>)
            } */}
            <span>{review.userID}</span>
            <span>{review.star}</span>
            <span>{review.category}</span>
            <span>{review.productName}</span>
            <span>({review.color})</span>
            <span>{review.size}</span>
            <span>{review.comment}</span>
          </div>
        ))}
      </div>

      <div>
        {/* 리뷰 등록날짜 정보 */}
        <span>등록날짜</span>
        <button>수정</button>
        <button onClick={() => dispatch(deleteReview())}>삭제</button>
      </div>
    </div>
  );
};

export default ReviewInput;
