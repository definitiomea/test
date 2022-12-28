import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import MyButton from "../style/Button";
import List from "../style/List";

import ReviewStar from "../components/ReviewStar";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

const ReviewAdd = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달창 열기
  const [bringImg, setBringImg] = useState();
  const [sendImg, setSendImg] = useState(false); // 모달창에서 사진추가후 리뷰페이지로 전달
  const [comment, setComment] = useState();
  const [addImgValue, setAddImgValue] = useState();
  const fileInput = useRef();

  const location = useLocation();
  const data = location.state.orderDone;

  // 사진첨부 모달창
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
  };

  const modalClose = () => {
    handleClose();
    setBringImg([]);
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

  const imgSubmit = () => {
    handleClose();
    setAddImgValue(bringImg);
  };
  console.log(addImgValue);

  return (
    <div style={{ marginLeft: "50px" }}>
      {/* 헤더 */}
      <div>
        <h2>
          <FontAwesomeIcon icon={faPencil} />
          Review
        </h2>
      </div>

      {/* 구매 상품정보 section */}

      <form>
        <List>
          <section>
            {/* 상품이미지 box*/}
            <div>
              <img
                src={require(`.././img/shirts-img/short/short-relax-beige-front.jpg`)}
                alt="#"
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            {/* 상품옵션 box */}
            <div>
              <div>
                <span>
                  <strong>{data.category}</strong>
                </span>
                <span> {data.productName}</span>
                <span> ({data.color})</span>
              </div>
              <div>
                <span>size : {data.size}</span>
              </div>
            </div>
          </section>
        </List>
        <br />

        {/* 별점 섹션 */}
        <section>
          <span>
            <strong>상품은 만족하셨나요?</strong>
          </span>

          <ReviewStar />

          <span>선택하세요.</span>
        </section>

        {/* 리뷰 입력란 섹션 */}
        <section>
          <p>
            <strong>어떤 점이 좋았나요?</strong>
          </p>
          <div>
            <textarea
              name=""
              id="reviewInput"
              cols="30"
              rows="10"
              minLength="10"
              maxLength="5000"
              placeholder="최소 10자 이상 작성해주세요."
              style={{ width: "20rem", height: "10rem", resize: "none" }}
            ></textarea>
            <em>
              <span>입력글자수</span>
            </em>
          </div>
        </section>

        {/* 사진첨부 섹션 */}
        <section>
          <MyButton onClick={handleOpen}>사진 첨부하기</MyButton>

          {/* 미리보기 사진 전달공간 */}
          <div
          // onChange={(e) => {
          //   sendImg(e.target.value);
          // }}
          >
            <img
              src={addImgValue}
              alt=""
              style={{ width: "120px", heigth: "120px" }}
            />
          </div>
          {/* 사진첨부 모달창*/}
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <MyButton>
                  <label htmlFor="imageInput">사진추가</label>
                </MyButton>
                <br />
                <input
                  type="file"
                  id="imageInput"
                  accept="image/jpg,imge/png,image/jpeg,image/gif"
                  required
                  onChange={addImg}
                  ref={fileInput}
                  style={{ display: "none" }}
                />
                <img
                  src={bringImg}
                  style={{ width: "100px", height: "100px" }}
                />
                {/* 사진삭제 버튼 */}
                <button
                  onClick={deleteImg}
                  style={{ backgroundColor: "gray", color: "white" }}
                >
                  x
                </button>

                {/* 사진업로드 */}
              </div>

              <MyButton onClick={modalClose}>취소</MyButton>
              <MyButton onClick={imgSubmit}>첨부완료</MyButton>
            </Box>
          </Modal>
        </section>

        {/* 취소 or 등록 section */}
        <div>
          <MyButton
            onClick={() => {
              prePage();
            }}
          >
            취소
          </MyButton>
          {/* 등록버튼 누르면 reviewinputReducer에 전달 */}
          <MyButton type="submit">등록</MyButton>
        </div>
      </form>
    </div>
  );
};

export default ReviewAdd;

// // 리뷰 내보내기
// export const exportReview = async ({}) => {

// };

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
