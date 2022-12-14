import styled from "styled-components";
import Button from "@mui/material/Button";
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <SmsFailedOutlinedIcon />
      <div>
        <div>OOPS</div>
        <div>We couldn't find the page your looking for.</div>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          VISIT HOMEPAGE
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          GO BACK
        </Button>
      </div>
    </Wrap>
  );
};

export default NotFound;

const Wrap = styled.div`
  height: calc(100vh - 160px);
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
  // 버튼 컴프를 따로 만든다면 가져오기
  .MuiButtonBase-root {
    margin: 2rem 1rem 1rem 0; 
    color: #f8f9fa;
    background-color: #212529;
    border-radius: 0;
    font-weight: bold;
    &:hover {
      background-color: black;
    }
  }
`;
