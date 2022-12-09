import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const ReviewAdd = () => {
  // 별점 기본값
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // map 돌릴 배열선언
  const array = [0, 1, 2, 3, 4];

  // <FaStar /> svg가 map함수에 의해 돌아가고 클릭한 별의 인덱스 값이 star에 찍힘

  {
    /*
클릭한 star값을 index로 받는 handleStarClick 함수
for문을 돌리면 i<=3 이 될 때까지는 true값을 반환함
이런 과정으로 별 3점을 클릭하면 [true,true,true,false,false]
*/
  }
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  console.log(clicked);
  // filter을 이용해 true값만 뽑아서 length를 이용해 개수를 확인 후 별점값을 내보냄
  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  // 클릭하면 리뷰 제출
  useEffect(() => {
    sendReview();
  }, [clicked]);

  // 별 색깔 스타일
  const RatingBox = styled.div`
    margin: 0;

    &svg {
      color: gray;
      cursor: pointer;
    }

    :hover svg {
      color: #fcc419;
    }

    /* hover된 별 이외에 나머지 별들(hover~svg)는 회색 */
    & svg:hover ~ svg {
      color: gray;
    }

    .yellowStar {
      color: #fcc419;
    }
  `;

  const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding: 200px;
  `;

  // 리뷰사진첨부

  // 파일을 미리 볼 url을 저장해줄 state
  const [fileImg, setFileImg] = useState("");

  // 파일저장
  const saveFileImg = (e) => {
    // URL.createObjectURL() : 등록한 파일을 화면에서 미리 보여즘
    // 반환된 값을 state에 저장
    setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImg = () => {
    // URL.revokeObjectURL() : URL.createObjectURL() 호출로부터 생성된 object URL을 해제하는 역할
    URL.revokeObjectURL(fileImg);
    setFileImg("");
  };

  return (
    <Container>
      <div>
        <h3>리뷰쓰기</h3>
        {/* 구매상품정보 섹션 */}
        <div>
          {/* 구매상품 이미지 */}
          <img src="" alt="" />
          {/* 구매상품 정보 */}
          <p>상품이름(종류,핏,색상)</p>
          <p>금액/개수 </p>
        </div>

        {/* 리뷰작성 섹션 */}
        <form>
          <div>
            <label htmlFor="">제목</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">리뷰작성</label>
            <br />
            <textarea placeholder="자세한 리뷰 부탁드립니다" />
          </div>

          <div>
            <p>
              <strong>별점</strong>
            </p>
            <RatingBox>
              {array.map((star) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={star}
                  size="35"
                  onClick={() => handleStarClick(star)}
                  className={clicked[star] ? "yellowStar" : undefined}
                />
              ))}
            </RatingBox>
          </div>

          <div>
            <p>
              <strong>사진첨부</strong>
            </p>
            <p>사진을 첨부해주세요</p>
          </div>

          {/* 리뷰 사진첨부 */}
          <div>
            <label htmlFor="">사진첨부하기</label>
            <br />
            {/* URL.createObjectURL()에서 반환된 값을 img의 src에 넘겨줌 */}
            <img src={fileImg} alt="sample" />

            {/* 사진업로드, 복수 선택 가능 */}
            {/* input은 display:none으로 숨기고 label과 id값을 같게 하여 대체함 */}
            <label
              htmlFor="imageInput"
              style={{ backgroundColor: "black", color: "white" }}
            >
              사진첨부
            </label>
            <input
              type="file"
              id="imageInput"
              accept=".png, .jpg, .jpeg"
              required
              multiple
              // input이미지가 사용자에 의해 선택이 되면, onChange함수 selecImg에서 파일을 체크한다
              // 이후 file 객체를 기반으로 이미지를 인코딩 처리한 후,
              // 인코딩된 문자열을 imagePreview state에 넣어줌으로써 렌더링하여 미리보기가 보인다
              onChange={saveFileImg}
              style={{ display: "none" }}
            />
            {/* 사진삭제 버튼 */}
            <button onClick={() => deleteFileImg()}>삭제</button>
          </div>
        </form>

        <button>작성완료</button>
      </div>
    </Container>
  );
};

export default ReviewAdd;
