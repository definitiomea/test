import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import MyButton from "../style/Button";

import ReviewStar from "../components/ReviewStar";
import { inputReview, editReview } from "../redux/reducers/reviewInputReducer";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ReviewAdd = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달창 열기
  const [star, setStar] = useState();
  const [bringImg, setBringImg] = useState();
  const [img, setImg] = useState();
  const [comment, setComment] = useState("");
  const [commentLength, setCommentLength] = useState(0);
  const fileInput = useRef();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.id);
  // const reviewID = useSelector((state) => state.reviewInput.reviewlist.reviewID); // 리뷰의 고유값 부여

  // 사진첨부 모달창
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
  };

  const modalClose = () => {
    handleClose();
    setBringImg([]);
  };

  const getImgPath = (item) => {
    if (typeof item.thumbnail !== "undefined") {
      switch (item.category) {
        case "short":
          return require(`../img/shirts-img/short/${item.thumbnail}`);
        case "long":
          return require(`../img/shirts-img/long/${item.thumbnail}`);
        default:
          return undefined;
      }
    }
  };

  // 취소버튼 누르면 이전페이지인 마이페이지로 이동
  const navigate = useNavigate();
  const prePage = () => {
    navigate("/mypage");
  };

  // 사진 첨부하기
  const addImg = (event) => {
    const {
      target: { files },
    } = event;
    const theImg = files[0];

    // 파일을 읽기 위한 fileReader 가져오기
    const reader = new FileReader();
    // onloadend에 fisnishedEvent의 result를 setScr로 설정해줌
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setBringImg(result);
    };
    // 사진의 url얻기
    reader.readAsDataURL(theImg);
  };

  // 사진 삭제버튼
  const deleteImg = () => {
    // 미리보기 img src 없애기
    setBringImg(null);
    // 첨부파일명 없애기
    fileInput.current.value = null;
  };

  // 이미지 제출
  const imgSubmit = () => {
    if (bringImg) {
      handleClose();
      setImg(bringImg);
    } else {
      alert("첨부된 사진이 없습니다.");
      return;
    }
  };
  // console.log(addImgValue);

  // 후기 제출
  const commentSubmit = (e) => {
    setComment(e.target.value);
  };
  // console.log(comment);

  // mypage의 배송완료 상품에서 받아온 프롭
  const location = useLocation();
  const [data, setData] = useState("");
  const [checkId, setCheckId] = useState("");
  // console.log(data);

  // 글자수와 별점을 선택하게 하는 함수
  const reviewSumbit = (e) => {
    e.preventDefault();
    if (comment?.length < 10) {
      alert("리뷰를 10자 이상 입력하세요.");
      return;
    } else if (!star) {
      alert("별점을 체크해주세요.");
      return;
    }

    const newReview = {
      // ...data,
      // reviewID,
      productID: data.productID,
      img,
      thumbnail: data.thumbnail,
      userID,
      star,
      category: data.category,
      productName: data.productName,
      size: data.size,
      color: data.color,
      comment,
    };
    // console.log(newReview);

    // 로그인유저가 작성한 유저가 같다면 작성내용을 input리듀서로 디스패치함
    // 코멘트 내용이 다르다면 edit리듀서로 디스패치함
    // 리뷰등록한 뒤 맞는 productID로 navigate됨
    if (userID === checkId) {
      dispatch(inputReview(newReview));
    } else if (location.state.comment !== comment) {
      dispatch(editReview(newReview));
    }
    alert("리뷰가 등록되었습니다.");
    navigate("/shop/" + data.productID);
  };

  // 마이페이지에서 값을 잘 받아오고 있으면 (주소창에 mypaye/review로 접근하는 등 편법 방지) 에러페이지를 출력함
  useEffect(() => {
    if (!location.state.data) {
      alert("잘못된 경로로 접근하였습니다.");
      navigate("/notfound");
    } else {
      setData(location.state.data);
      setCheckId(location.state.userId);
    }
  }, []);

  // textarea의 글자수를 input에 표시해주는 함수
  const commentClac = (e) => setCommentLength(e.target.value.length);

  return (
    <div className="review-add-box">
      {/* 헤더 */}
      <div className="review-title">
        <h1>Review</h1>
        <div className="review-line" />
      </div>

      {/* 구매 상품정보 section */}

      <form onSubmit={reviewSumbit} className="review-submit-form">
        <section className="review-form-product">
          {/* 상품이미지 box*/}
          <img src={getImgPath(data)} alt="No Image" style={{ width: "120px", height: "120px" }} />

          {/* 상품옵션 box */}
          <div>
            <div>
              <span>
                <b>[제품명] </b>
              </span>
              <span>{data?.category}</span>
              <span> {data?.productName}</span>
            </div>
            <div>
              <span>
                <b>[색상] </b>
              </span>
              <span>{data?.color}</span>
            </div>
            <div>
              <span>
                <b>[사이즈] </b>
              </span>
              <span>{data?.size}</span>
            </div>
          </div>
        </section>

        {/* 별점 섹션 */}
        <div>
          <section>
            <span>상품은 만족하셨나요?</span>
            <ReviewStar star={star} setStar={setStar} />
          </section>

          {/* 리뷰 입력란 섹션 */}
          <section className="review-comment">
            <span>어떤 점이 좋았나요?</span>
            <textarea
              cols="30"
              rows="10"
              onChange={commentSubmit}
              value={comment}
              maxLength="5000"
              placeholder="최소 10자 이상 작성해주세요."
            ></textarea>
            <em>
              <span>{commentLength} / 5,000</span>
            </em>
          </section>

          {/* 사진첨부 섹션 */}
          <section>
            <MyButton
              onClick={handleOpen}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "dashed 1px gray",
                padding: "20px 0",
              }}
            >
              <span style={{ fontSize: "17px" }}>
                <FontAwesomeIcon icon={faCamera} style={{ margin: "0 10px" }} />
                <strong>사진 첨부하기</strong>
              </span>
            </MyButton>

            {/* 미리보기 사진 전달공간 */}
            {/* 전달받은 이미지가 있으면 영역출력, 없으면 빈 div */}
            {img ? (
              <div>
                <img src={img} alt="" style={{ width: "180px", height: "240px", marginTop: "10px" }} />
              </div>
            ) : (
              <div></div>
            )}
            {/* 사진첨부 모달창*/}
            <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style} className="review-modal">
                <header>
                  <p>사진 첨부</p>
                </header>

                <input
                  type="file"
                  id="imageInput"
                  accept="image/jpg,imge/png,image/jpeg,image/gif"
                  required
                  onChange={addImg}
                  ref={fileInput}
                  style={{ display: "none" }}
                />

                {/* 이미지가 없다면 빈공간으로 만들어줌 */}
                {bringImg ? (
                  <div>
                    <img
                      src={bringImg}
                      style={{
                        width: "180px",
                        height: "240px",
                      }}
                    />
                    {/* 사진삭제 버튼 */}
                    {/* 사진이 있을 때만 x 버튼 노츨하는 삼항 */}
                    {bringImg ? (
                      <button className="review-xbutton" onClick={deleteImg}>
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {/* 사진업로드 */}
                <MyButton
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "solid 1px gray",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} style={{ margin: "0 5px" }} />
                  <label htmlFor="imageInput">사진추가</label>
                </MyButton>

                <div className="review-add-button">
                  <MyButton
                    onClick={modalClose}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "solid 1px gray",
                    }}
                  >
                    취소
                  </MyButton>

                  <MyButton onClick={imgSubmit}>첨부완료</MyButton>
                </div>
              </Box>
            </Modal>
          </section>

          {/* 취소 or 등록 section */}
          <section className="review-add-button">
            <MyButton
              onClick={() => {
                prePage();
              }}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "solid 1px gray",
              }}
            >
              취소
            </MyButton>
            {/* 등록버튼 누르면 reviewinputReducer에 전달 */}
            <MyButton type="submit">등록</MyButton>
          </section>
        </div>
      </form>
    </div>
  );
};

export default ReviewAdd;

// 사진첨부 모달창 style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
