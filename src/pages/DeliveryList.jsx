import DaumPostcode from "react-daum-postcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ADDIT_USER } from "../redux/reducers/signup";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../redux/reducers/user";

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

function DeliveryList() {
  // user 정보
  const user = useSelector((state) => state.user);

  const [address, setAddress] = useState(user.address);
  const [zoneCode, setZoneCode] = useState(user.zoneCode);
  const [detailAddress, setDetailAddress] = useState(user.detailAddress);
  const [reference, setReference] = useState(user.reference);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

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
    setZoneCode(value.split(" ")[0]);
    handleClose();
  };

  const submit = () => {
    handleOpen();
  };
  const relay = (e) => {
    e.preventDefault();
    Postcode();
    dispatch(
      ADDIT_USER({
        ...user,
        detailAddress,
        reference,
        zoneCode,
        address,
      })
    );
    dispatch(
      updateAddress({
        detailAddress,
        reference,
        zoneCode,
        address,
      })
    );
  };

  // 모달이 꺼지면서 zoneCode와 address값을 받아옴
  const save = () => {
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
        onClose={save}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Postcode adressValue={adressValue} zoneCodeValue={zoneCodeValue} />
        </Box>
      </Modal>
      <form onSubmit={relay}>
        <input
          type="text"
          id="sample6_postcode"
          onChange={changeZoneCode}
          name="zoneCode"
          value={zoneCode}
        />
        <br />
        <input
          type="text"
          id="sample6_address"
          name="address"
          onChange={changeAddress}
          value={address}
        />
        <br />
        <input
          type="text"
          id="sample6_detailAddress"
          name="detailAddress"
          onChange={(e) => {
            setDetailAddress(e.target.value);
          }}
          value={detailAddress}
        />
        <input
          type="text"
          id="sample6_extraAddress"
          name="reference"
          onChange={(e) => {
            setReference(e.target.value);
          }}
          value={reference}
        />
        <input type="button" defaultValue="우편번호 찾기" onClick={submit} />
        <button>배송지 변경</button>
      </form>
    </div>
  );
}

export default DeliveryList;
