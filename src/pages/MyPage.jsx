import AdditDeliveryList from "../components/AdditDeliveryList";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Delivery from "../components/Delivery";
import { useDispatch, useSelector } from "react-redux";
import { ADDIT_USER } from "../redux/reducers/signup";
import { loginUser } from "../redux/reducers/user";

import MyButton from "../style/Button";
import "../css/mypage-orderlist.css";
import "../css/mypage.css";
import { Desktop, Tablet, Mobile, Default } from "../hooks/MediaQuery";

const Mypage = () => {
  // 택배사 목록 state
  const [carriers, setCarriers] = useState([]);
  const [delivery, setDelivery] = useState();
  const [trackId, setTrackId] = useState("");
  const [carrierId, setCarrierId] = useState("");
  const [result, setResult] = useState(true);
  const [trans, setTrans] = useState(null);
  const [open, setOpen] = useState(false);
  const passwordCheck = useRef(null);
  const [checkPass, setCheckPass] = useState("");

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
    setTrans(findUser);
    getCarriers();
  }, []);

  const user = useSelector((state) => state.user);
  const signup = useSelector((state) => state.signup);
  const findUser = signup.userlist.find((userId) => userId.id === user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="mypage-title-border"></div>
      <h1 className="mypage-title">MyPage</h1>
      {/* 회원정보 수정 form */}
      <h4 className="section-title">회원정보 수정</h4>
      <div className="user-info">
        {/* <div className="labels">
          </div> */}
        <form
          className="user-info_form"
          onSubmit={() => {
            if (checkPass === trans.password) {
              dispatch(ADDIT_USER(trans));
              dispatch(loginUser(trans));
            } else {
              alert("누구세요");
            }
          }}
        >
          <label className="user-info_label">ID</label>
          <input
            className="user-info_input"
            type="text"
            name="id"
            defaultValue={user.id}
            onChange={onChange}
            disabled
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
            defaultValue={findUser ? user.password : ""}
            onChange={onChange}
          />
          <label className="user-info_label">Password check</label>
          {/* <label>비밀번호 확인</label> */}
          <input
            className="user-info_input"
            type="password"
            name="password-check"
            value={checkPass}
            onChange={(e) => setCheckPass(e.target.value)}
          />
          {/* button component적용 */}
          <MyButton type="submit">회원정보 수정</MyButton>
        </form>
        <div className="additDeliveryList">
          <AdditDeliveryList />
        </div>
      </div>

      {/* 주문/배송조회 form */}
      <h4 className="section-title">주문/배송 조회</h4>
      {/** 웹, 태블릿 */}
      <Default>
        <table className="order-list">
          <thead>
            <tr>
              <th>상품정보</th>
              <Desktop>
                <th>수량</th>
                <th>금액</th>
              </Desktop>
              <Tablet>
                <th>수량/금액</th>
              </Tablet>
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
                              <div className="table-product-name">
                                {order.category} {order.productName}
                              </div>
                              <div>
                                <span className="table-product-label">
                                  color
                                </span>
                                <span>{order.color}</span>
                              </div>
                              <div>
                                <span className="table-product-label">
                                  size
                                </span>
                                <span>{order.size}</span>
                              </div>
                              <div>
                                <span className="table-product-label">
                                  print
                                </span>
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
                          <Desktop>
                            <td>{order.quantity}</td>
                          </Desktop>
                          <td>
                            <Tablet>
                              <div>{order.quantity}</div>
                            </Tablet>
                            {order.totalPay.toLocaleString("ko-KR")}
                          </td>
                          <td>{order.orderDate}</td>
                          <td>
                            <div>{order.delivery}</div>
                            <div className="delivery-check-btn">
                              {order.delivery === "배송완료" ? (
                                <MyButton
                                  onClick={() => {
                                    navigate("/mypage/review", {
                                      state: order,
                                    });
                                  }}
                                >
                                  후기작성
                                </MyButton>
                              ) : (
                                <MyButton onClick={handleOpen}>
                                  배송조회
                                </MyButton>
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
        </table>
      </Default>

      {/** 모바일 */}
      <Mobile>
        <table className="order-list">
          <thead>
            <tr>
              <th>상품정보</th>
              <th>주문상태</th>
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
                          <td>
                            <img src={getImgPath(order)} alt="No Image" />
                          </td>
                          <td className="table-product-container">
                            <div className="table-order-date">
                              {order.orderDate}
                            </div>
                            <div className="table-product-name">
                              {order.category} {order.productName}
                            </div>
                            <div>
                              ₩ {order.totalPay.toLocaleString("ko-KR")}
                            </div>
                          </td>
                          <td>
                            <div>{order.delivery}</div>
                            <div className="delivery-check-btn">
                              {order.delivery === "배송완료" ? (
                                <MyButton
                                  onClick={() => {
                                    navigate("/mypage/review", {
                                      state: order,
                                    });
                                  }}
                                >
                                  후기작성
                                </MyButton>
                              ) : (
                                <MyButton onClick={handleOpen}>
                                  배송조회
                                </MyButton>
                              )}
                            </div>
                          </td>
                          <td className="table-product-info">
                            <div>
                              <div className="table-product-label">color</div>
                              <div>{order.color}</div>
                            </div>
                            <div>
                              <div className="table-product-label">size</div>
                              <div>{order.size}</div>
                            </div>
                            <div>
                              <div className="table-product-label">print</div>
                              {order.imgArray.length === 2 ? (
                                <div>
                                  {order.imgArray[0].print} /{" "}
                                  {order.imgArray[1].print}
                                </div>
                              ) : (
                                <div>{order.imgArray[0].print}</div>
                              )}
                            </div>
                            <div>
                              <div className="table-product-label">
                                quantity
                              </div>
                              <div>{order.quantity}</div>
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
        </table>
      </Mobile>

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
