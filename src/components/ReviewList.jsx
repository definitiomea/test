import { useSelector } from "react-redux";

const ReviewList = (props) => {
  // reviewReducer에서 initialState값 가져옴
  const reviewList = useSelector((state) => state.review.reviewList);

  // console.log(reviewList);

  // productDetail에서 props 받음
  const { compare } = props;
  // console.log(compare);

  return (
    <div>
      {/* 상품 category와 productName을 대조하여 댓글 출력함*/}
      {reviewList.map((review) => {
        return review.category == compare.category &&
          review.productName == compare.productName ? (
          <div key={review.id}>
            <p>별점존</p>
            <p>{review.category}</p>
            <p>{review.productName}</p>
            <p>{review.size}</p>
            <p>{review.comment}</p>
            <p>{review.date}</p>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default ReviewList;
