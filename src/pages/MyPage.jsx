// import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import AdditDeliveryList from "../components/AdditDeliveryList";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Delivery from "../components/Delivery";
import { useDispatch, useSelector } from "react-redux";
import { ADDIT_USER } from "../redux/reducers/signup";
import { loginUser } from "../redux/reducers/user";

import "../style/Mypage.css";
import MyButton from "../style/Button";
import MyTable from "../style/Table";

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
  const PAGE_UNIT = 3;
  const [viewCount, setViewCount] = useState(PAGE_UNIT);
  const navigate = useNavigate();

  const getImgPath = (item) => {
    switch (item.category) {
      case "short":
        return require(`../img/shirts-img/short/${item.thumbnail}`);
      case "long":
        return require(`../img/shirts-img/long/${item.thumbnail}`);
      default:
        return undefined;
    }
  };

  const viewMoreHandle = (list) => {
    if (list.length < viewCount + PAGE_UNIT) {
      setViewCount(orderDone.length);
    } else {
      setViewCount(viewCount + PAGE_UNIT);
    }
  };

  useEffect(() => {
    if (orderDone.length < PAGE_UNIT) {
      setViewCount(orderDone.length);
    }
  }, []);

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
            defaultValue={findUser ? findUser.password : ""}
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
        <AdditDeliveryList />
      </div>

      {/* 주문/배송조회 form */}
      <h4 className="section-title">주문/배송 조회</h4>
      <MyTable>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>사이즈</th>
            <th>수량/금액</th>
            <th>주문일자</th>
            <th>주문 상태</th>
          </tr>
        </thead>
        <tbody>
          {orderDone.length === 0 ? (
            <tr className="item-empty">
              <td>Empty</td>
            </tr>
          ) : (
            <>
              {orderDone
                .slice(0)
                .reverse()
                .map(
                  (order) =>
                    order.orderID > orderDone.length - viewCount && (
                      <tr key={order.orderID}>
                        <td className="table-product-container">
                          <img src={getImgPath(order)} alt="No Image" />
                          <div>
                            <div>
                              {order.category} {order.productName}
                            </div>
                            <div>
                              color
                              <span>{order.color}</span>
                            </div>
                            <div>
                              print
                              {order.imgArray.length === 2 ? (
                                <span>
                                  {order.imgArray[0].print} /{" "}
                                  {order.imgArray[1].print}
                                </span>
                              ) : (
                                <span>{order.imgArray[0].print}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{order.size}</td>
                        <td>
                          <div>{order.quantity}</div>
                          <div>{order.totalPay.toLocaleString("ko-KR")}</div>
                        </td>
                        <td>{order.orderDate}</td>
                        <td>
                          <div>{order.delivery}</div>
                          <div className="order-delivery-btn">
                            {order.delivery === "배송완료" ? (
                              <MyButton
                                onClick={() => {
                                  navigate("/mypage/review", {
                                    state: { order: order },
                                  });
                                }}
                              >
                                후기작성
                              </MyButton>
                            ) : (
                              <MyButton onClick={handleOpen}>배송조회</MyButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                )}
              <tr className="view-more-container">
                <td>
                  1-{viewCount} of {orderDone.length}
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      viewMoreHandle(orderDone);
                    }}
                  >
                    더보기
                  </Button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </MyTable>

      {/** 배송조회 모달 */}
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
    </div>
  );
};

export default Mypage;
