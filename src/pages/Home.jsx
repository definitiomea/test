import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import video from "../img/main/main-video.mp4";
import "../style/Home.css";

const Home = () => {
  // 세번째스크린 구독서비스
  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    if (!email == "") {
      alert("구독해주셔서 감사힙니다!");
    } else {
      alert("구독 받을 이메일을 입력해주세요");
    }
  };

  return (
    <div className="main-container">
      {/* 첫번째 스크린 */}
      <section className="first-screen">
        <div className="section-video">
          {/* 자동재생 무음 반복 */}
          <video src={video} autoPlay muted loop />
        </div>
        <div className="first-content">
          <p>Create your own t-shirts</p>
          <Link to="shop" className="toGoShop">
            VIEW
          </Link>
        </div>
      </section>

      {/* 두번째 스크린 */}
      <section className="second-screen">
        <div className="section-img">
          <img src={require("../img/main/main-img.jpg")} alt="" />
        </div>
        <div className="second-content">
          <section>사이트 소개/장점</section>
          <section>제작방식</section>
        </div>
      </section>

      {/* 세번째 스크린 */}
      <section className="last-screen">
        <div className="last-content">
          <form onSubmit={submitEmail}>
            <h3>상품 업데이트 정보를 구독 받으세요</h3>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={
                ((e) => {
                  setEmail(e.target.value);
                },
                [])
              }
            />
            <button className="submit-button">구독</button>
          </form>
          <div>
            {/* 가시성을 위해 아이콘으로 변경하기 */}
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="">Kakaotalk</a>
          </div>
          <div>
            <p>Copyright © 2022 Team MOTI</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
