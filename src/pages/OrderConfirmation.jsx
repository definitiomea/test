import styled from "styled-components";
import Button from "@mui/material/Button";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

const OrderConfirmation = () => {
  

  return (
    <Wrap>
      <TaskAltOutlinedIcon />
      <div>주문이 완료되었습니다.</div>
      <div>Thankyou for your purchase!</div>
      <Button>홈으로 가기</Button>
      <Button>구매내역 확인하기</Button>
    </Wrap>
  );
}

export default OrderConfirmation;

const Wrap = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 5rem;
    height: 5rem;
    color: #adb5bd;
  }
  div {
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
  // 버튼 컴프를 따로 만든다면 가져오기
  .MuiButtonBase-root {
    color: #f8f9fa;
    background-color: #212529;
    border-radius: 0;
    &:hover {
      background-color: black;
    }
  }
`;