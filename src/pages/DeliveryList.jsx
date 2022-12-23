import DaumPostcode from "react-daum-postcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ADDIT_USER } from "../redux/reducers/signup";
import { useDispatch, useSelector } from "react-redux";
import user, { loginUser, updateAddress } from "../redux/reducers/user";
import { useRef } from "react";

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
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  // 우편주소, 주소, 상세주소, 참고사항
  const [allAddress, setAllAddress] = useState({
    zoneCode: "",
    address: "",
    detailAddress: "",
    reference: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addressList = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const additAddress = {
      ...allAddress,
      // zoneCode: zoneCodeRef.current.value,
      // address: addressRef.current.value,
      [e.target.name]: e.target.value, // 상세주소, 참고사항
    };
    setAllAddress(additAddress);
  };
  // console.log(allAddress);

  // 모달이 꺼지면서 zoneCode와 address값을 받아옴 - 우편주소, 주소
  const save = () => {
    handleClose();
    setAllAddress({
      zoneCode: zoneCode,
      address: address,
    });
    console.log(allAddress);
  };

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

  const submit = () => {
    handleOpen();
  };

  const relay = (e) => {
    e.preventDefault();
    Postcode();
    dispatch(
      ADDIT_USER({
        ...allAddress,
        zoneCode,
        address,
      })
    );
    dispatch(
      loginUser({
        ...allAddress,
        zoneCode,
        address,
      })
    );
    console.log(allAddress);
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
          value={zoneCode.split(" ")[0]}
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
          onChange={onChange}
          value={addressList.detailAddress}
        />
        <input
          type="text"
          id="sample6_extraAddress"
          name="reference"
          onChange={onChange}
          value={addressList.reference}
        />
        <input type="button" defaultValue="우편번호 찾기" onClick={submit} />
        <button>배송지 변경</button>
        {/** submit을 위해 버튼을 input type="submit"으로 */}
        {/* <input type="submit" value="배송지 수정" /> */}
      </form>
    </div>
  );
}

export default DeliveryList;
