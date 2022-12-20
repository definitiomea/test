import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Outlet />
      {/* 메인위치에서는 푸터 숨김 */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default Layout;
