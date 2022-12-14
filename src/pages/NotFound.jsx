import styled from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrap>
      <div>
        <h1>OOPS!</h1>
        <p>We couldn't find the page your looking for.</p>
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
    </ErrorWrap>
  );
};

export default NotFound;

const ErrorWrap = styled.div`
  position: relative;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${"h1"} {
    color: #adb5bd;
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  ${"p"} {
    margin-bottom: 5rem;
  }
  .MuiButtonBase-root {
    margin-right: 1rem;
    margin-bottom: 1rem;
    color: #f8f9fa;
    background-color: #212529;
    font-weight: bold;
    &:hover {
      background-color: black;
    }
  }
`;
