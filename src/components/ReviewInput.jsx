import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../redux/reducers/reviewInputReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/review.css";
import { useNavigate } from "react-router-dom";
import user from "../redux/reducers/user";
import { Mobile, Default } from "../hooks/MediaQuery";
import { deleteReviewInOrder } from "../redux/reducers/order";

const ReviewInput = (props) => {
  // 상품의 ID이자 productID
  const { id } = props;
  // console.log(id);

  // 구매티셔츠 정보, 리뷰정보
  const reviewFile = useSelector((state) => state.reviewInput.reviewlist);
  // console.log(reviewFile[0]);

  const userID = useSelector((state) => state.user.id);
  // console.log(userID);

  const array = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="product-info-component">
      <Default>
        <div className="review-box">
          <div>
            {reviewFile.map((review, i) => (
              <div key={i}>
                {/* 상품ID와 작성리뷰의 상품ID가 같을 때만 출력 */}
                {id === String(review.productID) ? (
                  <div className="review-container" key={i}>
                    <div className="review-context-both">
                      <div>
                        {/* 이미지가 첨부되면 첨부파일을 출력, 첨부하지 않으면 상품 썸네일을 출력 */}
                        {/* {console.log(review.category)} */}
                        {/* 이미지 */}
                        {review.img ? (
                          <img
                            src={reviewFile[i].img}
                            alt=""
                            style={{ width: "120px", height: "130px" }}
                          />
                        ) : review && review.category === "short" ? (
                          <img
                            src={require(`../img/shirts-img/short/${review.thumbnail}`)}
                            style={{
                              width: "120px",
                              height: "130px",
                            }}
                          ></img>
                        ) : (
                          <img
                            src={require(`../img/shirts-img/long/${review.thumbnail}`)}
                            style={{
                              width: "120px",
                              height: "130px",
                            }}
                          ></img>
                        )}
                      </div>

                      {/* 아이디,상품정보,코멘트 */}
                      <div className="review-context">
                        <span>
                          <b>{review.userID}</b>
                        </span>
                        <span>
                          {array.map((el, i) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              key={el}
                              className={
                                review.star >= array[i] ? "yellowStar" : ""
                              }
                            />
                          ))}
                        </span>
                        <div>
                          <span>
                            {review.category} {review.productName} (
                            {review.color}) {review.size}
                          </span>
                        </div>
                        <span>{review.comment}</span>
                      </div>
                    </div>

                    {/* 로그인 유저와 리뷰를 작성한 유저가 같을 때만 수정과 삭제 가능 */}
                    {userID == review.userID ? (
                      <div className="review-option">
                        {/* 리뷰 등록날짜 정보 */}
                        <span>{review.date}</span>
                        <div className="review-button">
                          <button
                            onClick={() => {
                              navigate("/mypage/review", {
                                state: { data: review, userId: user.id },
                              });
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              dispatch(deleteReview(review));
                              dispatch(
                                deleteReviewInOrder({
                                  userID: review.userID,
                                  reviewID: review.reviewID,
                                })
                              );
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div className="review-option">
                    <span>{review.date}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Default>

      <Mobile>
        <div className="review-box">
          <div>
            {reviewFile.map((review, i) => (
              <div key={i}>
                {/* 상품ID와 작성리뷰의 상품ID가 같을 때만 출력 */}
                {id === String(review.productID) ? (
                  <div className="review-container" key={i}>
                    <div className="review-context-both">
                      {/* 아이디,상품정보,코멘트 */}
                      <div className="review-context">
                        <span>
                          <b>{review.userID}</b>
                        </span>
                        <span>
                          {array.map((el, i) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              key={el}
                              className={
                                review.star >= array[i] ? "yellowStar" : ""
                              }
                            />
                          ))}
                        </span>
                        <div>
                          <span>
                            {review.category} {review.productName} (
                            {review.color}) {review.size}
                          </span>
                        </div>
                        <span>{review.comment}</span>
                      </div>
                    </div>

                    {/* 이미지 */}
                    <div>
                      {review.img ? (
                        <img
                          src={reviewFile[i].img}
                          alt=""
                          style={{ width: "120px", height: "130px" }}
                        />
                      ) : review && review.category === "short" ? (
                        <img
                          src={require(`../img/shirts-img/short/${review.thumbnail}`)}
                          style={{
                            width: "120px",
                            height: "130px",
                          }}
                        ></img>
                      ) : (
                        <img
                          src={require(`../img/shirts-img/long/${review.thumbnail}`)}
                          style={{
                            width: "120px",
                            height: "130px",
                          }}
                        ></img>
                      )}
                    </div>

                    {/* 로그인 유저와 리뷰를 작성한 유저가 같을 때만 수정과 삭제 가능 */}
                    {userID == review.userID ? (
                      <div className="review-option">
                        {/* 리뷰 등록날짜 정보 */}
                        <span>{review.date}</span>
                        <div className="review-button">
                          <button
                            onClick={() => {
                              navigate("/mypage/review", {
                                state: { data: review, userId: user.id },
                              });
                            }}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              dispatch(deleteReview(review));
                              dispatch(
                                deleteReviewInOrder({
                                  userID: review.userID,
                                  reviewID: review.reviewID,
                                })
                              );
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="review-option">
                        <span>{review.date}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </Mobile>
    </div>
  );
};

export default ReviewInput;
