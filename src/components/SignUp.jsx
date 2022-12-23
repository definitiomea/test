import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

import { SIGN_UP } from "../redux/reducers/signup";

import MyButton from "../style/Button";

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
    address,
  };

  const findUser = signup.userlist.find(
    (signup) => signup.id === id || signup.email === email
  );

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!findUser) {
      dispatch(SIGN_UP(user));
      navigate("/");
    }
    // if (id === findUser.id) {
    //   alert("사용중인 아이디");
    // }
    // if (email === findUser.email) {
    //   alert("사용중인 email");
    // }

    if (password !== passwordCheck) {
      alert("비밀번호 불일치");
      return setPasswordError(true);
    } // else if(이미 가입된 아이디가 있다면 회원가입 실패)
  };

  return (
    <div
      className="signup-form"
      style={{
        padding: "150px 15px 15px 15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{ border: "2px solid black", padding: "15px" }}
        onSubmit={onSubmitForm}
      >
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="user-name"
            value={name}
            required
            onChange={onChangeName}
          />
        </div>
        <div>
          <label>ID</label>
          <br />
          <input
            type="text"
            name="user-id"
            value={id}
            required
            onChange={onChangeId}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">Password check</label>
          <br />
          <input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <p>Password가 일치하지 않습니다.</p>}
        </div>
        <div>
          <label>E-mail</label>
          <br />
          <input
            type="email"
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
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
        <MyButton type="submit">Sign up</MyButton>
      </form>
    </div>
  );
};

export default SignUpPage;
