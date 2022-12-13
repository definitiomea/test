import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentList = () => {
  // reviewReducer에서 initialState값 가져옴
  const reviewList = useSelector((state) => state.review.reviewList);

  console.log(reviewList);

  return (
    <div>
      {reviewList.map((review) =>
        review.category == "short" ? (
          <div key={review.id}>
            <p>{review.userID}</p>
            <p>{review.category}</p>
            <p>{review.productName}</p>
            <p>{review.size}</p>
            <p>{review.comment}</p>
            <p>{review.date}</p>
          </div>
        ) : (
          "d"
        )
      )}
    </div>
  );
};

export default CommentList;
