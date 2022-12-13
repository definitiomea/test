import { useDispatch } from "react-redux";
import { reviewAction } from "../reducers/reviewReducer";

// 상품 상세페이지에 더미리뷰 세팅
function setReview() {
  return (dispatch, getState) => {
    dispatch(commentAction, setReview);
  };
}

export const reviewAction = { setcomment };
