import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import Test from "./DaumPostcodeEmbed";
import "../components/ReviewAdd";

const Mypage = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 승연 임시데이터
  const perchaseItem = {
    category: "Short Sleeve T-shirt",
    productName: "relax-fit",
    color: "white",
    size: "S",
    print: "front",
    amount: 1,
    pay: "9,500",
  };

  return (
    <div>
      {/* 회원정보 수정 form */}
      <h4>회원정보 수정</h4>

      <UsetInfo>
        <Labels className="labels">
          <label>이름</label>
          <label>휴대폰 번호</label>
          <label>아이디</label>
          <label>비밀번호 변경</label>
          <label>비밀번호 확인</label>
        </Labels>

        <Inputs>
          <input type="text" value="홍길동" />
          <input type="text" value="010-****-1234" />
          <input type="text" value="roadBronze" />
          <input type="password" placeholder="비밀번호를 입력하세요" />
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </Inputs>

        <Test />
      </UsetInfo>
      <button>회원정보 수정</button>

      {/* 주문/배송조회 form  */}
      <MypageOrder>
        <h4>주문/배송 조회</h4>
        <MypageHead>
          <div>상품정보</div>
          <div>주문일자</div>
          <div>주문금액(수량)</div>
          <div>주문상태</div>
        </MypageHead>

        {/* 장바구니 상품 목록 */}
        <MypageBody>
          <MypagePd>
            <div>
              <img
                className="img"
                src="https://foremanbrosinc.com/wp-content/uploads/2017/05/1c0d0f0cb8b7f2fb2685da9798efe42b_big-image-png-image-placeholder-clipart_2400-2400-300x300.png"
                alt="#"
                style={{
                  width: "200px",
                  height: "100px",
                }}
              />
            </div>
            <MypageInfo>
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
            </MypageInfo>
          </MypagePd>

          <div>2022.11.11</div>

          <MypageColum>
            <div>9,500원</div>
            <div>1개</div> {/* 연한 회색 처리 */}
          </MypageColum>

          <MypageColum>
            <div>배송중</div>
            <div>
              <a
                href="https://tracker.delivery/#/kr.epost/1111111111111"
                target="_blank"
              >
                배송조회
              </a>
            </div>
          </MypageColum>
        </MypageBody>
      </MypageOrder>

      <MypageOrder>
        <h4>주문완료</h4>
        <MypageHead>
          <div>상품정보</div>
          <div>주문일자</div>
          <div>주문금액(수량)</div>
          <div>주문상태</div>
        </MypageHead>

        {/* 승연 테스트 - 주문완료 섹션 */}
        <MypageBody>
          <MypagePd>
            <div>
              <img
                className="img"
                src={require("../img/shirts-img/short/short-relax-white-front.jpg")}
                alt="#"
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
            </div>
            <MypageInfo>
              {/* 상품 정보 */}
              <div>
                <span>{perchaseItem.category} </span>
                <span>{perchaseItem.productName} </span>
                <span> ({perchaseItem.color}) </span>
              </div>

              {/* 프린팅 면 정보*/}
              <div>
                <span>print : </span>
                <span>{perchaseItem.print}</span>
              </div>

              {/* 사이즈 정보 */}
              <div>
                <span>size : </span>
                <span>{perchaseItem.size}</span>
              </div>
            </MypageInfo>
          </MypagePd>

          <div>2022.12.09</div>

          <MypageColum>
            <div>{perchaseItem.pay}</div>
            <div>{perchaseItem.amount}개</div> {/* 연한 회색 처리 */}
          </MypageColum>

          <MypageColum>
            <div>
              <Link to="/mypage/review" state={{ perchaseItem: perchaseItem }}>
                후기작성
              </Link>
            </div>
          </MypageColum>
        </MypageBody>
      </MypageOrder>
    </div>
  );
};

export default Mypage;

const UsetInfo = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const Labels = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const MypageOrder = styled.div`
  margin-top: 50px;
`;

const MypageHead = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  border: solid 1px;
  padding: 20px 0;
`;

const MypageBody = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  border: solid 1px;
  padding: 20px 0;
`;

const MypagePd = styled.div`
  display: flex;
  align-items: center;
`;

const MypageInfo = styled.div`
  flex-direction: column;
  margin-left: 10px;
`;

const MypageColum = styled.div`
  text-align: center;
`;

const MypageEvent = styled.div`
  margin-top: 50px;
`;
