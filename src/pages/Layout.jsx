import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// import "../style/Layout.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Outlet className="outlet" />
      {/* 메인위치에서는 푸터 숨김 */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default Layout;