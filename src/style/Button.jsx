import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    color: #f8f9fa;
    background-color: #212529;
    border-radius: 0;
    font-family: "ongothic";
    &:hover {
      background-color: black;
    }
  }
`;

function MyButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default MyButton;
