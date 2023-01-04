import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDIT_USER } from "../redux/reducers/signup";
import { loginUser } from "../redux/reducers/user";
import AdditDeliveryList from "../components/AdditDeliveryList";

import MyButton from "../style/Button";
import "../css/mypage.css";
import OrderList from "../components/OrderList";

const Mypage = () => {
  const [trans, setTrans] = useState(null);
  const [checkPass, setCheckPass] = useState("");

  const user = useSelector((state) => state.user);
  const signup = useSelector((state) => state.signup);
  const findUser = signup.userlist.find((userId) => userId.id === user.id);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const additUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setTrans(additUser);
  };

  return (
    <div className="mypage-container">
      {/* 회원정보 수정 form */}
      <h4 className="section-title">회원정보 수정</h4>
      <div className="user-info">
        {/* <div className="labels">
          </div> */}
        <form
          className="user-info_form"
          onSubmit={(e) => {
            if (checkPass === trans.password) {
              dispatch(ADDIT_USER(trans));
              dispatch(loginUser(trans));
            } else {
              alert("누구세요");
            }
          }}
        >
          <label className="user-info_label">ID</label>
          <input className="user-info_input" type="text" name="id" defaultValue={user.id} onChange={onChange} disabled />
          <label className="user-info_label">E-mail</label>
          <input className="user-info_input" type="text" name="email" defaultValue={user.email} onChange={onChange} />
          <label className="user-info_label">Password</label>
          <input className="user-info_input" type="password" name="password" defaultValue={findUser ? findUser.password : ""} onChange={onChange} />
          <label className="user-info_label">Password check</label>
          {/* <label>비밀번호 확인</label> */}
          <input className="user-info_input" type="password" name="password-check" value={checkPass} onChange={(e) => setCheckPass(e.target.value)} />
          {/* button component적용 */}
          <MyButton type="submit">회원정보 수정</MyButton>
        </form>
        <div className="additDeliveryList">
          <AdditDeliveryList />
        </div>
      </div>

      {/* 주문/배송조회 form */}
      <OrderList setTrans={setTrans} findUser={findUser} />
    </div>
  );
};

export default Mypage;