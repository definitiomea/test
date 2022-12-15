import styled from "styled-components";
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import MyButton from "../style/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <SmsFailedOutlinedIcon />
      <div>
        <div>OOPS</div>
        <div>We couldn't find the page your looking for.</div>
        <MyButton
          onClick={() => {
            navigate("/");
          }}
        >
          VISIT HOMEPAGE
        </MyButton>
        <MyButton
          onClick={() => {
            navigate(-1);
          }}
        >
          GO BACK
        </MyButton>
      </div>
    </Wrap>
  );
};

export default NotFound;

const Wrap = styled.div`
  min-height: calc(100vh - 204px); // 204px = 푸터 높이 + 네브 높이
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 11rem;
    height: 11rem;
    color: #ced4da;
    margin-right: 2rem;
  }
  div {
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
  button {
    margin: 2rem 1rem 1rem 0; 
    font-weight: bold;
  }
`;
