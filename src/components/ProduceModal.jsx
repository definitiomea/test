import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50vh",
  left: "50vw",
  /* 정 가운데로 배치하기 위한 transform */
  transform: 'translate(-50%, -50%)',
  /* 아직 높이 등은 설정 X */
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid dimgray",
  boxShadow: 24,
  p: 4,
};

const ProduceModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="produce-modal-component">
      <Modal
        open={open}
        onClose={() => handleClose()}
      >
        <Box sx={style}>
          <div><p>Whatever</p></div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProduceModal;
