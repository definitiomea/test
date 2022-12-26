import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import AdditDeliveryList from "../components/AdditDeliveryList";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import Delivery from "../components/Delivery";
import { useDispatch, useSelector } from "react-redux";
import { ADDIT_USER } from "../redux/reducers/signup";
import { loginUser } from "../redux/reducers/user";

const Mypage = () => {
  // 택배사 목록 state
  const [carriers, setCarriers] = useState([]);
  const [delivery, setDelivery] = useState();
  const [trackId, setTrackId] = useState("");
  const [carrierId, setCarrierId] = useState("");
  const [result, setResult] = useState(true);
  const [trans, setTrans] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResult(true);
  };

  const onChange = (e) => {
    const additUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setTrans(additUser);
  };

  const changeCarrierId = (e) => {
    setCarrierId(e.target.value);
  };

  const changeTrackId = (e) => {
    setTrackId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 택배사 목록값 가져와서 배송지 조회기능 구현
    const getDelivery = async () => {
      const json = await (
        await fetch(
          `https://apis.tracker.delivery/carriers/${carrierId}/tracks/${trackId}`
        )
      ).json();
      setDelivery(json);
    };
    getDelivery();
    setResult(false);
  };

  // 택배사 목록 비동기로 가져오기
  const getCarriers = async () => {
    const json = await (
      await fetch(`https://apis.tracker.delivery/carriers`)
    ).json();
    setCarriers(json);
  };
  useEffect(() => {
    getCarriers();
  }, []);

  // 로그인 유저, 회원가입된 유저
  const user = useSelector((state) => state.user);
  const signup = useSelector((state) => state.signup);
  const findUser = signup.userlist.find((userId) => userId.id === user.id);

  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // 주문완료 섹션 출력 함수
  const orderDone = useSelector((state) => state.orderlist.orderlist);

  return (
    <Body>
      {/* 회원정보 수정 form */}
      <H4>회원정보 수정</H4>

      <UserInfo>
        <Labels className="labels">
          <label>id</label>
          <label>email</label>
          <label>password</label>
          <label>password check</label>
        </Labels>

        {/* 회원가입, 로그인 유저값에 변환된 값 보내주기 */}
        <Inputs
          onSubmit={(e) => {
            dispatch(ADDIT_USER(trans));
            dispatch(loginUser(trans));
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="id"
            defaultValue={user.id}
            onChange={onChange}
          />
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            onChange={onChange}
          />

          <input
            type="password"
            name="password"
            // 로그인 상태 유저 id 와 회원가입시 유저 아이디 비교 후 패스워드 표출
            defaultValue={findUser ? findUser.password : ""}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            defaultValue={findUser ? findUser.password : ""}
            onChange={onChange}
          />
          <button>회원정보 수정</button>
        </Inputs>
        <AdditDeliveryList />
      </UserInfo>

      {/* 주문/배송조회 form  */}
      <MypageOrder>
        <H4>주문/배송 조회</H4>
        <MypageHead>
          <div>상품정보</div>
          <div>주문일자</div>
          <div>주문금액(수량)</div>
          <div>주문상태</div>
        </MypageHead>

        {/* 장바구니 상품 목록 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {result ? (
              <form onSubmit={onSubmit}>
                <select onChange={changeCarrierId} value={carrierId}>
                  <option value="">-택배사를 선택해주세요-</option>
                  {/* 택배사 목록 map로 option설정 */}
                  {carriers.map((array) => {
                    return (
                      <option value={array.id} key={array.id}>
                        {array.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="number"
                  placeholder="운송장번호"
                  onChange={changeTrackId}
                  defaultValue={trackId}
                />
                <button>조회</button>
              </form>
            ) : !delivery?.message ? (
              <Delivery
                stateText={delivery?.state.text}
                toName={delivery?.to.name}
                carrierName={delivery?.carrier.name}
                carrierTel={delivery?.carrier.tel}
                carrierId={delivery?.carrier.id}
                message={delivery?.message}
              />
            ) : (
              <div>
                <p>{delivery?.message}</p>
              </div>
            )}
          </Box>
        </Modal>
      </MypageOrder>

      {/* 주문완료 섹션 */}
      {orderDone.map((re) =>
        re.orderID ? (
          <MypageBody>
            <MypagePd>
              <div>
                <img
                  className="img"
                  src={require(`.././img/shirts-img/short/short-relax-beige-front.jpg`)}
                  alt="#"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
              <MypageInfo>
                {/* 상품 정보 */}
                <div>
                  <span>{re.category} </span>
                  <br />
                  <span>
                    {re.productName} ({re.color})
                  </span>
                </div>

                {/* 사이즈 정보 */}
                <div>
                  <span>size : {re.size}</span>
                </div>
              </MypageInfo>
            </MypagePd>

            <div>{re.orderDate}</div>

            <MypageColum>
              <div>{re.price}</div>
              <div>{re.quantity}개</div> {/* 연한 회색 처리 */}
            </MypageColum>

            <MypageColum>
              <div>
                {/* 상품준비 상태일 경우 배송조회 가능하게 */}
                {re.delivery === "상품준비" ? (
                  <button onClick={handleOpen}>배송조회</button>
                ) : (
                  <Link to="/mypage/review" state={{ orderDone: orderDone }}>
                    후기작성
                  </Link>
                )}
              </div>
            </MypageColum>
          </MypageBody>
        ) : (
          ""
        )
      )}
    </Body>
  );
};

export default Mypage;

const H4 = styled.h4`
  border-bottom: 2px solid black;
  margin-bottom: 15px;
  padding-bottom: 15px;
  font-weight: 700;
`;

const Body = styled.div`
  min-height: calc(100vh - 236px);
  max-width: 1280px;
  margin: auto;
  padding: 48px;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
`;

const Labels = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const Inputs = styled.form`
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
  border: solid 1px lightgrey;
  padding: 20px;
`;

const MypageBody = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  border: solid 1px lightgrey;
  border-top: 0;
  padding: 20px;
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
