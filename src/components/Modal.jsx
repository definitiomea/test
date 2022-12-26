import "../style/modal.css";
import useInput from "../hooks/useInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/user";

import "../style/Button";
import MyButton from "../style/Button";

const Modal = (props) => {
  const { open, close } = props;
  const signup = useSelector((state) => state.signup);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");

  // const onChangeId = (e) => {
  //   setId(e.target.value);
  //   console.log(e.target.value);
  // };

  // const onChangePassword = (e) => {
  //   setPassword(e.target.value);
  //   console.log(e.target.value);
  // };

  // custom hook 사용

  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = (e) => {
    e.preventDefault();

    // const isUser = (element) => {
    //   if (element.id === id || element.password === password) {
    //     return true;
    //   }
    // };

    const findUser = signup.userlist.find(
      (user) => user.id === id && user.password === password
    );

    if (!findUser) {
      alert("로그인 실패");
    } else {
      dispatch(
        loginUser({
          name: findUser.name,
          id: findUser.id,
          email: findUser.email,
          address: findUser.address,
          zoneCode: findUser.zoneCode,
          detailAddress: findUser.detailAddress,
          reference: findUser.reference,
          isLoggedIn: true,
        })
      );
      navigate("/");
    }

    // console.log(id, password);
  };

  const onClickSignup = () => {
    navigate("signup");
    close();
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="content-box">
          <button className="close" onClick={close}>
            X
          </button>

          <form className="login-form" onSubmit={onSubmitForm}>
            <div>
              <label>ID</label>
              <input
                className="login-form_input"
                type="text"
                name="user-id"
                value={id}
                onChange={onChangeId}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="login-form_input"
                type="password"
                name="user-password"
                value={password}
                onChange={onChangePassword}
                required
              />
            </div>
            <MyButton className="login-form_btn" type="submit">
              Log in
            </MyButton>
            <MyButton className="login-form_btn" onClick={onClickSignup}>
              Sign up
            </MyButton>
          </form>
          <div className="social">
            <button type="button">kakao</button>
            <button type="button">naver</button>
            <button type="button">google</button>
            <button type="button">instar</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
