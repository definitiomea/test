import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <div id="wrap">
      {/* 회원정보 수정 form */}
      <h4>회원정보 수정</h4>

      <form className="user-info">
        <div className="labels">
          <label>이름</label>
          <label>휴대폰 번호</label>
          <label>아이디</label>
          <label>비밀번호 변경</label>
          <label>비밀번호 확인</label>
        </div>

        <div className="inputs">
          <input type="text" value="홍길동" />
          <input type="text" value="010-****-1234" />
          <input type="text" value="roadBronze" />
          <input type="password" placeholder="비밀번호를 입력하세요" />
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </div>
      </form>
      <button>회원정보 수정</button>

      {/* 주문/배송조회 form  */}
      <form className="mypage-order">
        <h4>주문/배송 조회</h4>
        <div className="mypage-head">
          <div>상품정보</div>
          <div>주문일자</div>
          <div>주문금액(수량)</div>
          <div>주문상태</div>
        </div>

        {/* 장바구니 상품 목록 */}
        <div className="mypage-body">
          <div className="mypage-pd">
            <div>
              <img className="img" src="" alt="" />
            </div>
            <div className="mypage-info">
              {/* 상품 정보 */}
              <div>
                <span>short sleeve t-shirt</span>
                <span>standard fit</span>
                <span> (navy) </span>
              </div>

              {/* 프린팅 면 정보*/}
              <div>
                <span>print : </span>
                <span>front</span>
              </div>

              {/* 사이즈 정보 */}
              <div>
                <span>size : </span>
                <span>S</span>
              </div>
            </div>
          </div>

          <div>2022.11.11</div>

          <div className="mypage-column">
            <div>9,500원</div>
            <div>1개</div> {/* 연한 회색 처리 */}
          </div>

          <div className="mypage-column">
            <div>배송중</div>
            <div>
              <button className="delivery-button">배송조회</button>
            </div>
          </div>
        </div>
      </form>

      {/* 이벤트 배너 form  */}
      <div className="mypage-event">
        <h4>이벤트</h4>
      </div>
      <div
        style={{ width: "100%", height: "200px", backgroundColor: "skyblue" }}
      >
        <button onClick={() => navigate("/event")}>이벤트 바로가기</button>
      </div>
    </div>
  );
};

export default Mypage;
