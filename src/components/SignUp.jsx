import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";

import { SIGN_UP } from "../redux/reducers/signup";

const SignUpPage = () => {
  const dispatch = useDispatch();
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      alert("비밀번호 불일치");
      return setPasswordError(true);
    }
    dispatch(
      SIGN_UP({
        id: id,
        password: password,
        email: email,
        address: address,
      })
    );
    console.log(id, password, email, address);
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
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
        <div>
          <label>Address</label>
          <br />
          <input
            type="text"
            name="user-address"
            value={address}
            required
            onChange={onChangeAddress}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
