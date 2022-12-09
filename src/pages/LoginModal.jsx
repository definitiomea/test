import { useState } from "react";

import Modal from "../components/Modal";
import UserProfile from "../components/UserProfile";

const LoginModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    // layout의 login button 자리에 위치
    <div>
      {isLoggedIn ? (
        // log out button or 간단한 유저 프로필
        <UserProfile setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div>
          <button onClick={openModal}>Login</button>
          <Modal
            open={modalOpen}
            close={closeModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      )}
    </div>
  );
};

export default LoginModal;
