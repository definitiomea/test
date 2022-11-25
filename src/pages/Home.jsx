import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // 페이지 확인을 위한거라 스크롤 기능은 넣지 않음
  return (
    <div className="main-container">
      <div className="main-1">
        <h2>main 1</h2>
        <button onClick={() => {navigate("/shop")}}>view</button>
      </div>
      <div className="main-2">
        <h2>사이트 소개나 설명</h2>
      </div>
      <div className="main-3">
        <h2>푸터를 대체할 크레딧 ㅣ SNS</h2>
      </div>
    </div>
  );
}
 
export default Home;