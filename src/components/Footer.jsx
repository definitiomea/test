import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import ProduceModal from "../components/ProduceModal";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <footer>
      <div className="footer">
        <section className="footer-info">
          <div>
            <Link to="/">홈 이동</Link>
            <Link
              onClick={() => {
                handleOpen(true);
              }}
            >
              작업가이드
            </Link>
            <Link to="/mypage">주문/배송조회</Link>
            <Link style={{ border: "none" }}>이용약관</Link>
          </div>

          <div>
            부산 부산진구 중앙대로 749 <br /> Copyright © 2022 Team MOTI <br />
          </div>
        </section>

        <section className="footer-follow">
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
      </div>

      {/* 작업가이드 누르면 모달 열림 */}
      <ProduceModal open={open} setOpen={setOpen}></ProduceModal>
    </footer>
  );
};

export default Footer;
