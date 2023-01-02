// 배송조회 모달
import MyButton from "../style/Button";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";
import Delivery from "../components/Delivery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeliveryTracker = ({ setTrans, findUser }) => {
  // 택배사 목록 state
  const [carriers, setCarriers] = useState([]);
  const [delivery, setDelivery] = useState();
  const [trackId, setTrackId] = useState(null);
  const [carrierId, setCarrierId] = useState("");
  const [result, setResult] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResult(true);
  };

  const changeCarrierId = (e) => {
    setCarrierId(e.target.value);
  };

  const changeTrackId = (e) => {
    setTrackId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // map https://apis.tracker.delivery/carriers/:carrier_id/tracks/:track_id 패치값 가져와서 배송지 조회기능 구현
    const getDelivery = async () => {
      const json = await (
        await fetch(
          `https://apis.tracker.delivery/carriers/${carrierId}/tracks/${trackId}`
        )
      ).json();
      setDelivery(json);
    };
    getDelivery();
    setResult(false);
  };

  // 택배사 목록 비동기로 가져오기
  const getCarriers = async () => {
    const json = await (
      await fetch(`https://apis.tracker.delivery/carriers`)
    ).json();
    setCarriers(json);
  };
  useEffect(() => {
    setTrans(findUser);
    getCarriers();
  }, []);

  return (
    <>
      <MyButton onClick={handleOpen}>배송조회</MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {result ? (
            <form onSubmit={onSubmit}>
              <select onChange={changeCarrierId} value={carrierId}>
                <option value="">-택배사를 선택해주세요-</option>
                {/* 택배사 목록 map로 option설정 */}
                {carriers.map((array) => {
                  return (
                    <option value={array.id} key={array.id}>
                      {array.name}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                placeholder="운송장번호"
                onChange={changeTrackId}
                defaultValue={
                  trackId === null ? setTrackId(1111111111111) : trackId
                }
              />
              <button>조회</button>
            </form>
          ) : !delivery?.message ? (
            <Delivery
              stateText={delivery?.state.text}
              toName={delivery?.to.name}
              carrierName={delivery?.carrier.name}
              carrierTel={delivery?.carrier.tel}
              carrierId={delivery?.carrier.id}
              message={delivery?.message}
            />
          ) : (
            <div>
              <p>{delivery?.message}</p>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DeliveryTracker;
