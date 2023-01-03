import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { SIGN_UP } from "../redux/reducers/signup";

import "../css/signup.css";
import MyButton from "../style/Button";
import { AddDummyData } from "../redux/reducers/order";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const [name, onChangeName] = useInput("");
  const [id, onChangeId] = useInput("");
  // const [id, setId] = useState("");
  // const onChangeId = (e) => {
  //   setId(e.target.value);
  //   console.log(e.target.value);
  // };
  const [password, onChangePassword] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [address, onChangeAddress] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  let user = {
    name,
    id,
    password,
    email,
  };

  const findUser = signup.userlist.find((signup) => signup.id === id || signup.email === email);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!findUser) {
      dispatch(SIGN_UP(user));
      navigate("/");
    }
    // 이미 가입된 id / email이 있다면 회원가입 실패
    else if (id === findUser.id) {
      alert("이미 사용중인 아이디입니다.");
    } else if (email === findUser.email) {
      alert("이미 사용중인 email입니다.");
    }

    if (password !== passwordCheck) {
      alert("비밀번호 불일치");
      return setPasswordError(true);
    }
    // 후기작성 기능 확인을 위해 가입된 유저의 구매내역에 배송완료 더미데이터 추가
    dispatch(AddDummyData(user.id));
  };

  return (
    <div className="signup-container">
      <div className="signup-title-border"></div>
      <div className="signup-title-box">
        <h1 className="signup-title">Sign up</h1>
      </div>

      <form className="signup-form" onSubmit={onSubmitForm}>
        <label className="signup-label">Name</label>

        <input className="signup-input" type="text" name="user-name" value={name} required onChange={onChangeName} />

        <label className="signup-label">ID</label>

        <input className="signup-input" type="text" name="user-id" value={id} required onChange={onChangeId} />

        <label className="signup-label">Password</label>

        <input className="signup-input" type="password" name="user-password" value={password} required onChange={onChangePassword} />

        <label className="signup-label" htmlFor="user-password-check">
          Password check
        </label>

        <input className="signup-input" name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
        {passwordError && <p>Password가 일치하지 않습니다.</p>}

        <label className="signup-label">E-mail</label>

        <input className="signup-input" type="email" name="user-email" value={email} required onChange={onChangeEmail} />

        {/* 주소지 등록 / 수정 component를 따로 분리하여 삭제 */}
        {/* <div>
          <label>Address</label>
          <br />
          <input
            type="text"
            name="user-address"
            value={address}
            required
            onChange={onChangeAddress}
          />
        </div> */}

        <MyButton className="signup-btn" type="submit">
          Sign up
        </MyButton>
      </form>
    </div>
  );
};

export default SignUpPage;
