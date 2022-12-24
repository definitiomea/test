import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import video from "../img/main/main-video.mp4";
import "../style/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  // 메인 슬라이더 세팅
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: true, // 상하 슬라이드로 변경
    draggable: false,
    initialSlide: 0,
  };

  // 휠 스크롤로 변경
  const slider = useRef(null);
  const location = useLocation();
  const main = location.pathname === "index";

  const scroll = (e) => {
    if (slider === null) return 0;
    // 휠이 정지해있을 떄가 0이다. 휠을 올리면 wheelDelta값은 양수단위로 올라가고, 휠을 내리면 음수단위로 내려간다
    // wheelDelta값이 양수이면 다음 슬라이더로, 양수이면 이전 슬라이더 넘어간다
    e.wheelDelta > 0 ? slider.current.slickPrev() : slider.current.slickNext();
  };

  useEffect(() => {
    // addEventListener의 세번째 인자인 boolean의  false는 bubbling, true는 capturing이라고 칭한다
    // 버블링은 자식노드부터 이벤트가 발생하여 부모로 이벤트가 전파됨
    // 캡쳐링은 부모노드에서 자식노트로 이벤트가 전파됨
    window.addEventListener("wheel", scroll, true);
    return () => {
      window.removeEventListener("wheel", scroll, true);
    };
  }, []);

  // 세번째스크린 구독서비스
  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    if (!email == "") {
      alert("구독해주셔서 감사합니다!");
    } else {
      alert("구독 받을 이메일을 입력해주세요");
    }
  };

  return (
    <div className="main-container">
      {/* 첫번째 스크린 */}
      <Slider {...settings} ref={slider}>
        <section className="first-screen">
          <div>
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
          </div>
        </section>

        {/* 두번째 스크린 */}
        <section className="second-screen">
          <div className="section-img">
            <img src={require("../img/main/main-img.jpg")} alt="main" />
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="submit-button">구독</button>
            </form>

            <div className="team-info">
              <div>
                <p>Copyright © 2022 Team MOTI</p>
              </div>

              <div>
                {/* 가시성을 위해 아이콘으로 변경하기 */}
                <a href="https://www.instagram.com/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.facebook.com/">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Slider>
    </div>
  );
};

export default Home;

// <button onClick={() => {slider.current.slickGoTo(0)}}>테스트</button>
