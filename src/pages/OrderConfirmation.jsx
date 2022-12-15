import styled from "styled-components";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import MyButton from "../style/Button";

const OrderConfirmation = () => {
  return (
    <Wrap>
      <TaskAltOutlinedIcon />
      <div>주문이 완료되었습니다.</div>
      <div>Thankyou for your purchase!</div>
      <MyButton>홈으로 가기</MyButton>
      <MyButton>구매내역 확인하기</MyButton>
    </Wrap>
  );
};

export default OrderConfirmation;

const Wrap = styled.div`
  min-height: calc(100vh - 204px); // 160 : 푸터 + 네브
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 5rem;
    height: 5rem;
    color: #adb5bd;
  }
  &:nth-child(1) {
    font-weight: bold;
  }
`;
