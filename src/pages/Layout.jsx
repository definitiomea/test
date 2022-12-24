import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// import "../style/Layout.css";

const Layout = () => {
  const location = useLocation();

  // 푸터 하단 고정을 위해 추가한 클래스와 div
  return (
    <div id="wrapper">
      <Navbar />
      <div className="body-container">
        <Outlet />
        {/* 메인위치에서는 푸터 숨김 */}
        {location.pathname !== "/" && <Footer />}
      </div>
    </div>
  );
};

export default Layout;