// import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import DaumPostcodeEmbed from "./DeliveryList";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import Delivery from "./Delivery";
import { useDispatch, useSelector } from "react-redux";
import { ADDIT_USER } from "../redux/reducers/signup";
import { loginUser } from "../redux/reducers/user";

import "../style/Mypage.css";
import "../style/Button";
import MyButton from "../style/Button";

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
    // map https://apis.tracker.delivery/carriers/:carrier_id/tracks/:track_id 패치값 가져와서 배송지 조회기능 구현
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

  const user = useSelector((state) => state.user);

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
    <div className="mypage-container">
      {/* 회원정보 수정 form */}
      <h4 className="section-title">회원정보 수정</h4>

      <div className="user-info">
        {/* <div className="labels">
        </div> */}

        <form
          className="user-info_form"
          onSubmit={(e) => {
            dispatch(ADDIT_USER(trans));
            dispatch(loginUser(trans));
            e.preventDefault();
          }}
        >
          <label className="user-info_label">ID</label>
          <input
            className="user-info_input"
            type="text"
            name="id"
            defaultValue={user.id}
            onChange={onChange}
          />
          <label className="user-info_label">E-mail</label>
          <input
            className="user-info_input"
            type="text"
            name="email"
            defaultValue={user.email}
            onChange={onChange}
          />
          <label className="user-info_label">Password</label>
          <input
            className="user-info_input"
            type="password"
            name="password"
            defaultValue={user.password}
            onChange={onChange}
          />
          <label className="user-info_label">Password check</label>
          {/* <label>비밀번호 확인</label> */}
          <input
            className="user-info_input"
            type="password"
            name="password-check"
            placeholder={user.password}
            onChange={onChange}
          />
          {/* button component적용 */}
          <MyButton>회원정보 수정</MyButton>
        </form>
        <DaumPostcodeEmbed />
      </div>

      {/* 주문/배송조회 form  */}
      <h4 className="section-title">주문/배송 조회</h4>

      <div>
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
              <img
                className="img"
                src="https://foremanbrosinc.com/wp-content/uploads/2017/05/1c0d0f0cb8b7f2fb2685da9798efe42b_big-image-png-image-placeholder-clipart_2400-2400-300x300.png"
                alt=""
                style={{
                  width: "200px",
                  height: "100px",
                }}
              />
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
            <button onClick={handleOpen}>배송조회</button>
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
          </div>
        </div>
      </div>

      {/* 주문완료 섹션 */}
      {orderDone.map((re) =>
        re.orderID == 3 ? (
          <div className="mypage-body">
            <div className="mypage-pd">
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
              <div className="mypage-info">
                {/* 상품 정보 */}
                <div>
                  <span>{re.category} </span>
                  <span>{re.productName} </span>
                  <span> ({re.color}) </span>
                </div>

                {/* 사이즈 정보 */}
                <div>
                  <span>size : </span>
                  <span>{re.size}</span>
                </div>
              </div>
            </div>

            <div></div>

            <div className="mypage-column">
              <div>{re.price}</div>
              <div>{re.quantity}개</div> {/* 연한 회색 처리 */}
            </div>

            <div className="mypage-column">
              <div>
                {/* 주문상태 추가 */}
                <div>배송완료</div>
                <Link to="/mypage/review" state={{ orderDone: orderDone[2] }}>
                  후기작성
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Mypage;

// css - section-title
// const H4 = styled.h4`
//   border-bottom: 2px solid black;
//   margin-bottom: 15px;
//   padding-bottom: 15px;
//   font-weight: 700;
// `;

// css - mypage-container
// const Body = styled.div`
//   min-height: calc(100vh - 236px);
//   max-width: 1280px;
//   margin: auto;
//   padding: 48px;
// `;

// css - user-info
// const UserInfo = styled.div`
//   display: grid;
//   grid-template-columns: auto 1fr;
//   grid-gap: 20px;
// `;

// css - labels
// const Labels = styled.div`
//   display: grid;
//   grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
// `;

// css - inputs
// const Inputs = styled.form`
//   display: grid;
//   grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
// `;

// 삭제
// const MypageOrder = styled.div`
//   // margin-top: 50px;
// `;

// css - mypage-head
// const MypageHead = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1fr;
//   justify-items: center;
//   align-items: center;
//   border: solid 1px lightgrey;
//   padding: 20px;
// `;

// css - mypage-body
// const MypageBody = styled.div`
//   width: 100%;
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1fr;
//   justify-items: center;
//   align-items: center;
//   border: solid 1px lightgrey;
//   border-top: 0;
//   padding: 20px;
// `;

// css - mypage-pd
// const MypagePd = styled.div`
//   display: flex;
//   align-items: center;
// `;

// css - mypage-info
// const MypageInfo = styled.div`
//   flex-direction: column;
//   margin-left: 10px;
// `;

// css - mypage-column
// const MypageColum = styled.div`
//   text-align: center;
// `;

// 삭제
// const MypageEvent = styled.div`
//   margin-top: 50px;
// `;
