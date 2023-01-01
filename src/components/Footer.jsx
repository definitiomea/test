import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [toGoMain, setToGoMain] = useState();
  const navigate = useNavigate();

  const MainSecond = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <section className="footer-info">
        <div>
          <Link
            onClick={() => {
              MainSecond();
            }}
          >
            회사소개
          </Link>
          <Link>작업가이드</Link>
          <Link to="/mypage">주문/배송조회</Link>
          <Link style={{ border: "none" }}>이용약관</Link>
        </div>

        <div>
          부산 부산진구 중앙대로 749 <br /> Copyright © 2022 Team MOTI <br />
        </div>
      </section>

      <section>
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faGithub} />
          </a>
      </section>
    </footer>
  );
};

export default Footer;
