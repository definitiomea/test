import { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../components/Modal";
import UserProfile from "../components/UserProfile";

const LoginModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useSelector((state) => state.user);

  // console.log(isLoggedIn);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    // layout의 login button 자리에 위치
    <div>
      {user.isLoggedIn ? (
        // log out button or 간단한 유저 프로필
        <UserProfile />
      ) : (
        <div>
          <button onClick={openModal}>Login</button>
          <Modal open={modalOpen} close={closeModal} />
        </div>
      )}
    </div>
  );
};

export default LoginModal;
