import DeliveryTracker from "../components/DeliveryTracker";
import { Button } from "@mui/material";
import MyButton from "../style/Button";
import "../css/mypage-orderlist.css";
import { Desktop, Tablet, Mobile, Default } from "../hooks/MediaQuery";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReviewInput from "./ReviewInput";

const OrderList = ({ setTrans, findUser }) => {
  const user = useSelector((state) => state.user);
  const orderDone = useSelector((state) => state.orderlist.orderlist);
  const findUserData =
    JSON.stringify(user) === "{}"
      ? undefined
      : orderDone.find((item) => item.userId === user.id);

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
      setViewCount(list.length);
    } else {
      setViewCount(viewCount + PAGE_UNIT);
    }
  };

  useEffect(() => {
    if (findUserData) {
      findUserData.itemlist.length < PAGE_UNIT
        ? setViewCount(findUserData.itemlist.length)
        : setViewCount(PAGE_UNIT);
    }
  }, []);

  return (
    <>
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
            {JSON.stringify(user) === "{}" ? (
              <tr className="item-empty">
                <td>로그인 후 이용해주세요</td>
              </tr>
            ) : (
              <>
                {!findUserData ? (
                  <tr className="item-empty">
                    <td>구매내역이 없습니다</td>
                  </tr>
                ) : (
                  <>
                    {findUserData.itemlist
                      .slice(-viewCount)
                      .reverse()
                      .map((order) => (
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
                                <ReviewButton order={order} userId={user.id} />
                              ) : (
                                <DeliveryTracker
                                  setTrans={setTrans}
                                  findUser={findUser}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    <tr className="view-more-container">
                      <td>
                        1-{viewCount} of {findUserData.itemlist.length}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={() => {
                            viewMoreHandle(findUserData.itemlist);
                          }}
                        >
                          더보기
                        </Button>
                      </td>
                    </tr>
                  </>
                )}
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
            {JSON.stringify(user) === "{}" ? (
              <tr className="item-empty">
                <td>로그인 후 이용해주세요</td>
              </tr>
            ) : (
              <>
                {!findUserData ? (
                  <tr className="item-empty">
                    <td>Empty</td>
                  </tr>
                ) : (
                  <>
                    {findUserData.itemlist
                      .slice(-viewCount)
                      .reverse()
                      .map((order) => (
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
                            <div className="delivery-check-btn">
                              {order.delivery === "배송완료" ? (
                                <ReviewButton order={order} userId={user.id} />
                              ) : (
                                <DeliveryTracker
                                  setTrans={setTrans}
                                  findUser={findUser}
                                />
                              )}
                            </div>
                            <div>{order.delivery}</div>
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
                      ))}
                    <tr className="view-more-container">
                      <td>
                        1-{viewCount} of {findUserData.itemlist.length}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={() => {
                            viewMoreHandle(findUserData.itemlist);
                          }}
                        >
                          더보기
                        </Button>
                      </td>
                    </tr>
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </Mobile>
    </>
  );
};

export default OrderList;

// 리뷰 버튼
const ReviewButton = ({ order, userId }) => {
  const navigate = useNavigate();

  return (
    <>
      {Object.keys(order).includes("reviewID") ? (
        <MyButton
          onClick={() => {
            navigate("/shop/" + order.productID);
          }}
        >
          리뷰확인
        </MyButton>
      ) : (
        <MyButton
          onClick={() => {
            navigate("/mypage/review", {
              state: { data: order, userId },
            });
          }}
        >
          리뷰작성
        </MyButton>
      )}
    </>
  );
};
