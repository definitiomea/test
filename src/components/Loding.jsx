import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrap>
      <CircularProgress color="inherit" size={50} />
    </Wrap>
  );
};

export default Loading;

const Wrap = styled.div`
  min-height: calc(100vh - 204px); // 204px = 푸터 높이 + 네브 높이
  display: flex;
  justify-content: center;
  align-items: center;
`;
