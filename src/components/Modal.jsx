import "../css/modal.css";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/user";

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
        login({
          name: findUser.name,
          id: findUser.id,
          email: findUser.email,
          address: findUser.address,
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
              <br />
              <input
                type="text"
                name="user-id"
                value={id}
                onChange={onChangeId}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="user-password"
                value={password}
                onChange={onChangePassword}
                required
              />
            </div>
            <button className="login-btn" type="submit">
              Log in
            </button>
          </form>
          <button className="signup-btn" onClick={onClickSignup}>
            Sign up
          </button>
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
