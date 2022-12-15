import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { writeReview, writerReview } from "../redux/reducers/reviewReducer";

const ReaviewAdd = () => {
  // Link를 통해 이동할 때는 useLocation()을 사용해야함
  const location = useLocation();
  const data = location.state.orderDone;

  const commentList = useSelector((state) => state.reivew);
  const dispatch = useDispatch();

  return (
    <ReviewBox>
      <div>
        {/* 헤더 */}
        <header>
          <h1>리뷰쓰기</h1>
        </header>

        {/* 구매 상품정보 section */}

        <section style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}>
          {/* 상품이미지 box*/}
          <div>
            <img src="" alt="" style={{ width: "100px", height: "100px" }} />
          </div>

          {/* 상품옵션 box */}
          <div>
            <span>
              <strong>{data.category}</strong>
            </span>
            <span>
              선택 : {data.productName} ({data.color})
            </span>
          </div>
        </section>

        {/* 리뷰 작성 section */}
        <section style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}>
          {/* 별점 box */}
          <div>
            <p>
              <strong>상품은 만족하셨나요?</strong>
            </p>
            <div>별점존</div>
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
                <label htmlFor="reviewInput">최소 10자 이상입니다.</label>
                <textarea name="" id="reviewInput" cols="30" rows="10"></textarea>
                <em>
                  <span>입력글자수</span>
                </em>
              </div>
            </div>

            {/* 사진첨부 */}
            <div>
              <a href="#">사진 첨부하기</a>
            </div>
          </div>
        </section>

        {/* 취소 or 등록 section */}
        <section style={{ backgroundColor: "lightyellow", marginBottom: "10px" }}>
          <div>
            <button>취소</button>
          </div>
          <div>
            <button onClick={() => dispatch(writeReview())}>등록</button>
          </div>
        </section>
      </div>
    </ReviewBox>
  );
};

export default ReaviewAdd;

const ReviewBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding-top: 100px;
`;
