import styled from "styled-components";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import MyButton from "../style/Button";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <TaskAltOutlinedIcon />
      <div>
        <div>주문이 완료되었습니다.</div>
        <div>Thankyou for your purchase!</div>
        <MyButton
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로 가기
        </MyButton>
        <MyButton
          onClick={() => {
            navigate("/mypage");
          }}
        >
          구매내역 확인하기
        </MyButton>
      </div>
    </Wrap>
  );
};

export default OrderConfirm;

const Wrap = styled.div`
  min-height: calc(100vh - 236px); // 236px = 푸터 높이 + 네브 높이
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 11rem;
    height: 11rem;
    color: #ced4da;
    margin-right: 3rem;
  }
  div {
    &:first-child {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  button {
    margin: 2rem 1rem 1rem 0;
    font-weight: bold;
  }
`;
