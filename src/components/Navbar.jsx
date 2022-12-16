import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";

const Navbar = (props) => {
  // 모바일 버전 시 네브 토글바
  const [toggleOpen, setToggleOpen] = useState(false);

  // 로그인
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(user ? true : false);
  }, [user]);

  const logOut = () => {
    setLogin(false);
    dispatch(setUser(null));
    navigate("");
  };

  // main페이지와 다른 페이지의 css 차별을 위해 메인위치 지정해줌
  const location = useLocation();
  const main = location.pathname === "/";

  return (
    <header>
      <nav className={main ? "main-nav" : "page-nav"}>
        <div>
          <NavLink
            to="/"
            // 메인이 아닐 때 nav의 폰트색상 black
            className={main ? "white-logo" : "dark-logo"}
            // 로고 클릭시 상단으로 부드럽게 이동
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            MOTI
          </NavLink>
        </div>
        <button className="toggle-button" onClick={() => setToggleOpen(!toggleOpen)} style={{ fontSize: "25px" }}>
          {/* 토글버튼 열리면 햄버거아이콘, 닫히면 x아이콘 */}
          {/*
          {toggleOpen ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
          */}
        </button>

        {/* 모바일 버전 메뉴 */}
        <ul className="mobile-nav">
          <NavLink to="shop">SHOP</NavLink>
          <NavLink to="cart">CART</NavLink>
          <NavLink to="mypage">MYPAGE</NavLink>
          <NavLink to="login">LOGIN</NavLink>
          <NavLink to="">LOGOUT</NavLink>
        </ul>

        <ul>
          {/* 네브바 리스트 */}
          <li>
            <NavLink to="shop" className={main ? "white-nav" : "dark-nav"}>
              SHOP
            </NavLink>
          </li>

          <li>
            <NavLink to="cart" className={main ? "white-nav" : "dark-nav"} v>
              CART
            </NavLink>
          </li>
          {login ? (
            <li className="dropdown">
              <div className={main ? "white-nav" : "dark-nav"}>{user.name}님</div>
              <div className="dropdown-menu">
                <NavLink to="mypage" className={main ? "white-dropdown" : "dark-dropdown"}>
                  MYPAGE
                </NavLink>
                <button className={main ? "white-dropdown" : "dark-dropdown"} onClick={logOut}>
                  LOGOUT
                </button>
              </div>
            </li>
          ) : (
            <button
              className={main ? "white-nav" : "dark-nav"}
              onClick={() => {
                navigate("/login");
              }}
            >
              LOGIN
            </button>
          )}
        </ul>
        {/* 모바일 화면 - 햄버거 메뉴 */}
      </nav>
    </header>
  );
};

export default Navbar;
