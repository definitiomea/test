import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    color: #f8f9fa;
    background-color: #212529;
    border-radius: 0;
    font-family: "ongothic";
    margin-bottom: 5px;
    &:hover {
      background-color: black;
    }
  }
`;

function MyButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default MyButton;

// 1. 쓰고자하는 컴포넌트에서 임포트
// import List from "../style/StyledList"
// 2. 태그로 감싸서 사용
// <MyButton>...</MyButton>

// 스타일 수정 > () 안에 컴포넌트 이름
// const NewList = styled(MyButton)`
//   &.MuiButtonBase-root {
//   ...
//   }
// `;
