import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  // useLocation() : 현재 url 정보를 가져옴
  const location = useLocation();
  const [show, setShow] = useState(false);

  // 현재 url의 정보가 main이면 footer에 hidden 클래스 추가
  // 아니면 footer에 hidden 클래스 삭제
  // hidden { display : none }
  useEffect(() => {
    if (location.pathname == "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  return (
    <div className={show ? "footer" : "footer hidden"}>
      <h1>Footer</h1>
    </div>
  );
};

export default Footer;
