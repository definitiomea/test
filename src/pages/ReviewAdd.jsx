import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

import ReviewStar from "../components/ReviewStar";
import { Modal } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

const ReaviewAdd = () => {
  // 사진첨부 모달창
  const [open, setOpen] = useState(false);
  // 파일을 미리 볼 url을 저장해줄 state
  const [fileImg, setFileImg] = useState([]);
  // 모달창에서 사진추가후 리뷰페이지로 전달
  const [sendImg, setSendImg] = useState(false);

  // Link를 통해 이동할 때는 useLocation()을 사용해야함
  const location = useLocation();
  const data = location.state.orderDone;

  // 사진첨부 모달창
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // 사진첨부 모달창 취소/등록
  const modalClose = () => {
    handleClose();
    setFileImg(null);
  };

  // 파일저장하기
  const saveFileImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result;

      setFileImg((prev) => [...prev, reader.result]);
      console.log(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  // 파일 내보내기
  const exportFile = async () => {};

  // // 파일저장
  // // URL.createObjectURL() : 등록한 파일을 화면에서 미리 보여즘
  // // 반환된 값을 state에 저장
  // const saveFileImg = (e) => {
  //   setFileImg(URL.createObjectURL(e.target.files[0]));
  // };
  // // 파일 삭제
  // const deleteFileImg = () => {
  //   // URL.revokeObjectURL() : URL.createObjectURL() 호출로부터 생성된 object URL을 해제하는 역할
  //   URL.revokeObjectURL(fileImg);
  //   setFileImg("");
  // };

  // 취소버튼 누르면 이전페이지인 마이페이지로 이동
  const navigate = useNavigate();
  const prePage = () => {
    navigate("/mypage");
  };

  return (
    <ReviewBox>
      <div>
        {/* 헤더 */}
        <header>
          <h1>리뷰쓰기</h1>
        </header>

        {/* 구매 상품정보 section */}
        <section
          style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}
        >
          {/* 상품이미지 box*/}
          <div>
            <img
              src={require(`.././img/shirts-img/short/short-relax-beige-front.jpg`)}
              alt=""
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
              <span>size : </span>
              <span>{data.size}</span>
            </div>
          </div>
        </section>
        {/* 리뷰 작성 section */}
        <section
          style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}
        >
          {/* 별점 box */}
          <div>
            <p>
              <strong>상품은 만족하셨나요?</strong>
            </p>
            <div>별점존</div>
            <div>
              <ReviewStar />
            </div>
            <div>선택하세요.</div>
          </div>

          <hr />
          {/* 후기,사진첨부 box */}
          <div>
            {/* 후기 */}
            <div>
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

                {/* 미리보기 사진 전달공간 */}
                <div
                  onChange={(e) => {
                    sendImg(e.target.value);
                  }}
                >
                  <img
                    src={sendImg}
                    alt=""
                    style={{ width: "120px", heigth: "120px" }}
                  />
                </div>
              </div>
            </div>

            {/* 사진첨부 */}
            <ReviewBtn>
              <div>
                <button onClick={handleOpen}>사진 첨부하기</button>
              </div>
            </ReviewBtn>

            {/* 사진첨부 모달창*/}
            <ReviewColum>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/jpg,impge/png,image/jpeg,image/gif"
                      required
                      // input이미지가 사용자에 의해 선택이 되면, onChange함수 selecImg에서 파일을 체크한다
                      // 이후 file 객체를 기반으로 이미지를 인코딩 처리한 후,
                      // 인코딩된 문자열을 imagePreview state에 넣어줌으로써 렌더링하여 미리보기가 보인다
                      // onChange={saveFileImg}
                      style={{ display: "none" }}
                      onChange={saveFileImg}
                    />
                    {/* URL.createObjectURL()에서 반환된 값을 img의 src에 넘겨줌 */}
                    <div style={{ height: "15rem" }}>
                      {fileImg ? (
                        <img
                          src={fileImg}
                          alt="sample"
                          style={{ width: "120px", heigth: "120px" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {/* 사진업로드 */}
                    {/* input은 display:none으로 숨기고 label과 id값을 같게 하여 대체함 */}
                    <ReviewBtn>
                      <label htmlFor="imageInput">사진추가</label>
                    </ReviewBtn>
                    {/* 사진삭제 버튼 */}
                    <ReviewBtn>
                      {/* <button onClick={() => deleteFileImg()}>삭제</button> */}
                      <button>삭제</button>
                    </ReviewBtn>
                  </div>

                  <ReviewBtn>
                    <button onClick={modalClose}>취소</button>
                  </ReviewBtn>
                  <ReviewBtn>
                    <button
                      onClick={() => {
                        setSendImg(fileImg);
                        setFileImg(null);
                        handleClose();
                      }}
                    >
                      등록
                    </button>
                  </ReviewBtn>
                </Box>
              </Modal>
            </ReviewColum>
          </div>
        </section>
        {/* 취소 or 등록 section */}
        <section
          style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}
        >
          <ReviewBtn>
            <button
              onClick={() => {
                prePage();
              }}
            >
              취소
            </button>
          </ReviewBtn>
          <ReviewBtn>
            <button>등록</button>
          </ReviewBtn>
        </section>
      </div>
    </ReviewBox>
  );
};

export default ReaviewAdd;

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

const ReviewBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding-top: 100px;
`;

const ReviewColum = styled.div`
  text-align: center;
`;

const ReviewBtn = styled.div`
  border: 2px solid;
  width: 160px;
  height: 50px;
  text-align: center;
  padding: 10px;
`;
