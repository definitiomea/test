import DaumPostcode from "react-daum-postcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const Postcode = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postCode = data.zonecode;
    let extraAddress = "";
    let extraPostCode = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
        extraPostCode += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        extraPostCode +=
          extraPostCode !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      postCode += extraPostCode !== "" ? ` (${extraPostCode})` : "";
    }
    props.adressValue(fullAddress);
    props.zoneCodeValue(postCode);
  };

  return <DaumPostcode onComplete={handleComplete} {...props} />;
};

function BasicModal() {
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const adressValue = (value) => {
    setAddress(value);
    handleClose();
  };
  const changeZoneCode = (e) => {
    setZoneCode(e.target.value);
  };
  const zoneCodeValue = (value) => {
    setZoneCode(value);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Postcode adressValue={adressValue} zoneCodeValue={zoneCodeValue} />
        </Box>
      </Modal>
      <form onSubmit={Postcode}>
        <input
          type="text"
          id="sample6_postcode"
          placeholder="우편번호"
          onChange={changeZoneCode}
          value={zoneCode}
        />
        <input
          type="button"
          onclick="sample6_execDaumPostcode()"
          value="우편번호 찾기"
          onClick={handleOpen}
        />
        <br />
        <input
          type="text"
          id="sample6_address"
          placeholder="주소"
          onChange={changeAddress}
          value={address}
        />
        <br />
        <input type="text" id="sample6_detailAddress" placeholder="상세주소" />
        <input type="text" id="sample6_extraAddress" placeholder="참고항목" />
      </form>
    </div>
  );
}

export default BasicModal;
