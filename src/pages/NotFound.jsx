import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h1>페이지가 존재하지 않습니다</h1>
      <button onClick={() => {navigate("/")}}>홈으로 가기</button>
    </div>
  );
};

export default NotFound;
