import "../css/modal.css";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/user";

const Modal = (props) => {
  const { open, close, setIsLoggedIn } = props;
  const signup = useSelector((state) => state.signup.value);
  const dispatch = useDispatch();

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
    if (id !== signup.id || password !== signup.password) {
      alert("로그인 실패");
      return setIsLoggedIn(false);
    }
    dispatch(
      login({ id: signup.id, email: signup.email, address: signup.address })
    );
    console.log(id, password);
    setIsLoggedIn(true);
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
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
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
