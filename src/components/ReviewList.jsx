import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/review.css";
import { Mobile, Default } from "../hooks/MediaQuery";

const ReviewList = (props) => {
  // reviewReducer에서 initialState값 가져옴
  const reviewList = useSelector((state) => state.review.reviewList);
  // console.log(reviewList);

  // productDetail에서 props 받음
  const { compare } = props;
  // console.log(compare);

  const array = [1, 2, 3, 4, 5];

  return (
    <div className="product-info-component">
      <Default>
        <div className="review-box">
          {/* 상품 category와 productName을 대조하여 댓글 출력함*/}
          {reviewList.map((review) => {
            return review.category == compare.category && review.productName == compare.productName ? (
              <div key={review.id} className="review-container">
                <div className="review-context-both">
                  {/* 카테고리명 short와 long 구분 */}

                  <div>
                    {review.category == "short" ? (
                      <img
                        src={require(`../img/shirts-img/short/${review.image}`)}
                        alt="short"
                        style={{
                          width: "120px",
                          height: "130px",
                        }}
                      />
                    ) : (
                      <img
                        src={require(`../img/shirts-img/long/${review.image}`)}
                        alt="short"
                        style={{
                          width: "120px",
                          height: "130px",
                        }}
                      />
                    )}
                  </div>
                  <div className="review-context">
                    <span>
                      <b>{review.userID}</b>
                    </span>
                    <span>
                      <span>
                        {array.map((el, i) => (
                          <FontAwesomeIcon icon={faStar} key={el} className={review.rating >= array[i] ? "yellowStar" : ""} />
                        ))}
                      </span>
                    </span>
                    <div>
                      <span>
                        {review.category} {review.productName} ({review.color}) size:{review.size}
                      </span>
                    </div>
                    <span>{review.comment}</span>
                  </div>
                </div>

                <div div className="review-option">
                  <span>{review.date}</span>
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </Default>

      <Mobile>
        <div className="review-box">
          {/* 상품 category와 productName을 대조하여 댓글 출력함*/}
          {reviewList.map((review) => {
            return review.category == compare.category && review.productName == compare.productName ? (
              // 아이디,상품정보,코멘트
              <div key={review.id} className="review-container">
                <div className="review-context-both">
                  <div className="review-context">
                    <span>
                      <b>{review.userID}</b>
                    </span>
                    <span>
                      <span>
                        {array.map((el, i) => (
                          <FontAwesomeIcon icon={faStar} key={el} className={review.rating >= array[i] ? "yellowStar" : ""} />
                        ))}
                      </span>
                    </span>
                    <div>
                      <span>
                        {review.category} {review.productName} ({review.color}) size:{review.size}
                      </span>
                    </div>
                    <span>{review.comment}</span>
                  </div>
                </div>

                {/* 이미지 */}
                <div>
                  {review.category == "short" ? (
                    <img
                      src={require(`../img/shirts-img/short/${review.image}`)}
                      alt="short"
                      style={{
                        width: "120px",
                        height: "130px",
                      }}
                    />
                  ) : (
                    <img
                      src={require(`../img/shirts-img/long/${review.image}`)}
                      alt="short"
                      style={{
                        width: "120px",
                        height: "130px",
                      }}
                    />
                  )}
                </div>

                <div div className="review-option">
                  <span>{review.date}</span>
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </Mobile>
    </div>
  );
};

export default ReviewList;
