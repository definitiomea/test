import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // 로그인/로그아웃에 따른 네브바 확인을 위한 임시
  const signIn = () => {
    setLogin(true);
  };
  const signOut = () => {
    setLogin(false);
    // 로그아웃 시 메인(home)으로 이동할 것
  };

  return (
    <div>
      <div className="navbar">
        {/** 타이틀을 누르면 main(home)으로 이동 */}
        <NavLink to="/">
          <h1>MOTI</h1>
        </NavLink>
        <div className="nav-link">
          <NavLink to="/shop">SHOP</NavLink>
          {login ? (
            <div>
              <NavLink to="/cart">CART</NavLink>
              <NavLink to="/mypage">MY PAGE</NavLink>
              <NavLink onClick={signOut}>SIGN OUT</NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/signup">SIGN UP</NavLink>
              <NavLink onClick={signIn}>SIGN IN</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
