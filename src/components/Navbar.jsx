import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/user";

import Modal from "../components/Modal";
import { Squash as Hamburger } from "hamburger-react";
import styled from "styled-components";
import { useRef } from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  // 리덕스 user 가져옴
  const userName = useSelector((state) => state.user);

  // modal login form
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 로그인
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(user.isLoggedIn ? true : false);
  }, [user]);

  const logOut = () => {
    setLogin(false);
    // dispatch(setUser(null));
    dispatch(logout());
    navigate("");
  };

  // 메인페이지와 다른 페이지의 css 차별을 위해 메인위치 지정해줌
  const location = useLocation();
  const main = location.pathname === "/";

  return (
    <nav className={main ? "main-nav" : "page-nav"}>
      <div className="navbar-logo">
        <NavLink
          to="/"
          // 메인이 아닐 때 nav의 폰트색상 black
          className={main ? "white-logo" : "dark-logo"}
        >
          MOTI
        </NavLink>
      </div>
      <ul className="navbar-menu">
        {/* 네브바 리스트 */}
        <li>
          <NavLink to="shop" className={main ? "white-nav" : "dark-nav"}>
            SHOP
          </NavLink>
        </li>

        <li>
          <NavLink to="cart" className={main ? "white-nav" : "dark-nav"}>
            CART
          </NavLink>
        </li>

        {login ? (
          <li className="dropdown">
            <div
              className={main ? "white-nav" : "dark-nav"}
              style={{ fontWeight: "bold" }}
            >
              {userName.name}님
            </div>
            <div className="dropdown-menu">
              <NavLink
                to="mypage"
                className={main ? "white-dropdown" : "dark-dropdown"}
              >
                MYPAGE
              </NavLink>

              <button
                className={main ? "white-dropdown" : "dark-dropdown"}
                onClick={logOut}
              >
                LOGOUT
              </button>
            </div>
          </li>
        ) : (
          <div>
            <button
              className={main ? "white-nav" : "dark-nav"}
              onClick={
                openModal
                //   () => {
                //   navigate("/login");
                // }
              }
            >
              LOGIN
            </button>
            <Modal setModalOpen={setModalOpen} open={modalOpen} />
          </div>
        )}
      </ul>
      {/* 모바일 화면 메뉴창 */}
      <Hamburger
        className="toggle-button"
        toggled={isOpen}
        toggle={setOpen}
        color={main || isOpen ? "white" : "black"}
        size={28}
        // onToggle={(toggled) => {
        //   if (toggled) {
        //     console.log("toggle On");
        //   } else {
        //     console.log("toggle off");
        //     //close a menu
        //   }
        // }}
      />
      <MobileNav>
        <div className={isOpen ? "mobile-nav" : "hidden-mobile-nav"}>
          <div className="mobile-nav-wrap">
            <ul>
              <li>
                <NavLink to="shop">SHOP</NavLink>
              </li>
              <li>
                <NavLink to="cart">CART</NavLink>
              </li>
              <li>
                <NavLink to="mypage">MYPAGE</NavLink>
              </li>
            </ul>
            {login ? (
              <div>
                <button onClick={logOut}>LOGOUT</button>
              </div>
            ) : (
              <div>
                <button onClick={openModal}>LOGIN</button>
                {/* <Modal setModalOpen={setModalOpen} open={modalOpen} /> */}
              </div>
            )}
          </div>
        </div>
      </MobileNav>
    </nav>
  );
};

export default Navbar;

const MobileNav = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  right: -60%;
  width: 60%;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  background-color: black;
  opacity: 90%;
  transition: 0.5s ease;
  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;
