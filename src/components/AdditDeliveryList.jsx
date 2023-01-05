import DaumPostcode from "react-daum-postcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ADDIT_USER } from "../redux/reducers/signup";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../redux/reducers/user";

import "../css/deliveryList.css";
import "../style/Button";
import MyButton from "../style/Button";

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

function AdditDeliveryList() {
  // user 정보
  const user = useSelector((state) => state.user);
  const signup = useSelector((state) => state.signup);
  const findUser = signup.userlist.find((userId) => userId.id === user.id);

  const [address, setAddress] = useState(user.address);
  const [zoneCode, setZoneCode] = useState(user.zoneCode);
  const [detailAddress, setDetailAddress] = useState(user.detailAddress);
  const [reference, setReference] = useState(user.reference);
  const [direct, setDirect] = useState(user.direct);

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

  const relay = () => {
    Postcode();
    dispatch(
      ADDIT_USER({
        ...findUser,
        address,
        zoneCode,
        detailAddress,
        reference,
        direct: reference === "직접입력" ? direct : "",
      })
    );
    dispatch(
      updateAddress({
        ...user,
        address,
        zoneCode,
        detailAddress,
        reference,
        direct: reference === "직접입력" ? direct : "",
      })
    );
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
      <form className="post-form" onSubmit={relay}>
        {/* <input
          className="post-form_btn"
          type="button"
          defaultValue="우편번호 찾기"
          onClick={submit}
        /> */}

        {/*float: left로 위치 조정 */}
        <label className="post-form_label">우편번호</label>
        <div className="postcode-form">
          <input
            type="text"
            className="post-form_input"
            id="sample6_postcode"
            onChange={changeZoneCode}
            name="zoneCode"
            placeholder="우편번호"
            value={zoneCode || ""}
          />
          {/* input type:button -> button tag로 변경 */}
          <input
            type="button"
            className="post-form_btn"
            defaultValue="우편번호 찾기"
            onClick={submit}
          />
        </div>
        <label className="post-form_label">주소</label>
        <input
          type="text"
          className="post-form_input"
          id="sample6_address"
          name="address"
          onChange={changeAddress}
          placeholder="주소"
          value={address || ""}
        />
        <label className="post-form_label">상세주소</label>
        <input
          type="text"
          className="post-form_input"
          id="sample6_detailAddress"
          name="detailAddress"
          onChange={(e) => {
            setDetailAddress(e.target.value);
          }}
          placeholder="상세주소"
          value={detailAddress || ""}
        />
        <label className="post-form_label">배송메모</label>

        <select
          className="post-form_input"
          value={reference || ""}
          onChange={(e) => {
            setReference(e.target.value);
          }}
        >
          <option value="배송전 연락해주세요">배송전 연락해주세요</option>
          <option value="문 앞에 두고 벨 눌러주세요">
            문 앞에 두고 벨 눌러주세요
          </option>
          <option value="벨 누르지 말고 노크해주세요">
            벨 누르지 말고 노크해주세요
          </option>
          <option value="요청사항 없음">요청사항 없음</option>
          <option value="직접입력">직접입력</option>
        </select>

        {reference === "직접입력" ? (
          <input
            type="text"
            className="post-form_input"
            id="sample6_extraAddress"
            onChange={(e) => {
              setDirect(e.target.value);
            }}
            value={direct || ""}
          />
        ) : (
          ""
        )}
        {/* button component적용 */}
        <MyButton type="submit">배송지 변경</MyButton>
      </form>
    </div>
  );
}

export default AdditDeliveryList;
