import { useSelector } from "react-redux";
import styled from "styled-components";
import ReviewStar from "../components/ReviewStar";
const ReviewList = (props) => {
  // reviewReducer에서 initialState값 가져옴
  const reviewList = useSelector((state) => state.review.reviewList);

  // console.log(reviewList);

  // productDetail에서 props 받음
  const { compare } = props;
  // console.log(compare);

  return (
    <div>
      <h1>더미</h1>
      {/* 상품 category와 productName을 대조하여 댓글 출력함*/}
      {reviewList.map((review) => {
        return review.category == compare.category &&
          review.productName == compare.productName ? (
          <div key={review.id}>
            {/* {review.category == "short" ():()} */}
            <ReviewColumn>
              <div>
                <img
                  src={require(`../img/shirts-img/short/${review.image}`)}
                  alt="short"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>

              <ReviewRow>
                <div>
                  <span>{review.userID}</span>
                  <span>
                    <ReviewStar />
                  </span>
                  <span>{review.category}</span>
                  <span>{review.productName}</span>
                  <span>({review.color})</span>
                  <sapn>size:{review.size}</sapn>
                  <span>{review.comment}</span>
                </div>
              </ReviewRow>

              <div>
                <span>{review.date}</span>
              </div>
            </ReviewColumn>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default ReviewList;

const ReviewColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewRow = styled.div`
  display: flex;
  flex-direction: Row;
`;
