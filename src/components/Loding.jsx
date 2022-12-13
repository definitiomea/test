import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Loading = () => {
  return (
    <div>
      <CircularProgress color="inherit"/>
    </div>
  );
};

export default Loading;

const LoadingWrap = styled.div`
  
`;