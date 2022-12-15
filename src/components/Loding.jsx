import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrap>
      <div>
        <CircularProgress color="inherit" size={50} />
      </div>
    </LoadingWrap>
  );
};

export default Loading;

const LoadingWrap = styled.div`
  min-height: calc(100vh - 160px); // 160px : 푸터 높이 + 네브 높이
  display: flex;
  > div {
    margin: auto;
  }
`;
