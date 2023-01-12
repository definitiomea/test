import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faRepeat,
  faFont,
  faRotateLeft,
  faRotateRight,
  faEraser,
  faFloppyDisk,
  faCircleMinus,
  faXmark,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50vh",
  left: "50vw",
  /* 정 가운데로 배치하기 위한 transform */
  transform: "translate(-50%, -50%)",
  /* 아직 높이 등은 설정 X */
  width: "80vw",
  height: "90vh",
  overflow: "scroll",
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
      <Modal open={open} onClose={() => handleClose()}>
        <Box sx={style}>
          <div className="produce-info">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0.5em",
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  handleClose();
                }}
              ></FontAwesomeIcon>
            </div>
            <p className="produce-info-section">제작 방법 소개</p>
            <p>
              이미지의 상단은 편집용 버튼이며, 우측은 이미지 저장 및 지우기
              버튼입니다.
            </p>
            <p className="produce-info-section">편집용 버튼</p>
            <ul>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon> 티셔츠의 앞,
                뒤를 뒤집는 버튼입니다.
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2vh 2vw",
                  }}
                >
                  <img
                    src={require(`../img/produce/example_front.png`)}
                    alt=""
                    className="require2img"
                  />
                  <img
                    src={require(`../img/produce/example_back.png`)}
                    alt=""
                    className="require2img"
                  />
                </div>
              </li>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon>{" "}
                이미지를 티셔츠에 넣기 원하는 경우, 업로드 하실 수 있습니다.
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_upload.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faFont}></FontAwesomeIcon> 티셔츠에
                텍스트를 추가할 수 있는 버튼입니다.
              </li>
              <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                <img
                  src={require(`../img/produce/example_addtext.png`)}
                  alt=""
                  className="require1img"
                />
              </div>
              <li style={{ padding: "2vh 2vw" }}>
                <span>■</span> 텍스트를 추가하신 경우, 해당 텍스트를 클릭하여
                선택하신 뒤 색상을 바꿀 수 있습니다.
                <p className="produce-important">
                  추가하신 텍스트에 한해서 색상이 바뀌며, 이미지 등의 색상은
                  바뀌지 않습니다.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_adjusttextcolor.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>{" "}
                <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>{" "}
                편집하신 내용을 되돌리고 싶거나, 다시 실행하실 때 사용하실 수
                있습니다.
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_undo.png`)}
                    alt=""
                    className="require2img"
                  />
                  <img
                    src={require(`../img/produce/example_redo.png`)}
                    alt=""
                    className="require2img"
                  />
                </div>
              </li>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon> 티셔츠 위에
                올려져있던 모든 요소를 지웁니다.
                <p className="produce-important">
                  단, 아래 기능을 통해 저장된 도안 이미지를 지우는 것은
                  아닙니다.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_clear.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
            </ul>
            <p className="produce-info-section">저장 및 초기화 버튼</p>
            <ul>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon> 이미지
                편집이 끝나셨다면 이 버튼을 통해 저장하실 수 있습니다. 앞, 뒤
                어느 면에서도 저장할 수 있고 편집하지 않은 반대 면을
                보여드립니다.
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_save_1.png`)}
                    alt=""
                    className="require2img"
                  />
                  <img
                    src={require(`../img/produce/example_save_2.png`)}
                    alt=""
                    className="require2img"
                  />
                </div>
                <p className="produce-important">
                  단, 앞 뒷면 모두를 편집하신 경우에는 추가로 저장하실 수
                  없습니다.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_save_err.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon> 편집한
                이미지를 저장했지만 마음에 들지 않아 다시 편집하고 싶으시다면 이
                버튼을 통해 간단한 확인 후 저장한 이미지를 초기화할 수 있습니다.
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_delimg_1.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_delimg_2.png`)}
                    alt=""
                    className="require2img"
                  />
                  <img
                    src={require(`../img/produce/example_delimg_3.png`)}
                    alt=""
                    className="require2img"
                  />
                </div>
                <p className="produce-important">
                  저장한 모든 이미지가 초기화되는 점을 유의해주세요.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_delimg_4.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
            </ul>
            <p className="produce-info-section">편집 후 장바구니 담기</p>
            <ul>
              <li style={{ padding: "2vh 2vw" }}>
                <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> 티셔츠
                꾸미기를 마치시고, 편집한 이미지를 저장하셨다면 이 버튼을 통해
                장바구니에 담으실 수 있습니다. 저장하신 도안은 장바구니
                페이지에서 확인하실 수 있습니다.
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_addcart_1.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
                <p className="produce-important">
                  저장하신 이미지가 있을 경우에만 장바구니에 담으실 수 있는 점을
                  유의해주세요.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', padding: '2vh 2vw'}}>
                  <img
                    src={require(`../img/produce/example_addcart_2.png`)}
                    alt=""
                    className="require1img"
                  />
                </div>
              </li>
            </ul>
            <p className="produce-info-section">주의사항</p>
            <ul>
              <li>
                작은 원본 이미지를 사이즈 규격에 맞게 임의로 크게 확대할 경우
                인쇄 시 화질이 깨질 수 있습니다.
              </li>
              <li>상품 실측 사이즈를 반드시 확인해 주세요.</li>
              <li>
                모니터, 핸드폰에 따라 실제 인쇄 색상과 다르게 보일 수 있습니다.
              </li>
            </ul>
            <p className="produce-info-section">교환/환불 불가 사항</p>
            <p>
              모티의 모든 상품은 고객 주문에 따라 개별 제작되는 방식으로 단순
              변심을 포함, 아래의 경우에는 교환 / 환불이 불가합니다.
            </p>
            <ul>
              <li>
                디자인 시안 색상의 차이
                <p>
                  프린팅 방식과 원단 재질에 따른 경우의 수가 다양하므로 인쇄 후
                  모니터, 혹은 종이 출력물과 색상 차이가 발생할 수 있습니다.
                </p>
              </li>
              <li>
                인쇄 위치 및 크기의 차이
                <p>
                  제품 재질에 따른 특성의 차이와 대부분의 인쇄가 수작업으로
                  이루어진다는 점에서 시안과 실제 상품의 인쇄 위치 및 크기의
                  오차가 발생할 수 있습니다. 인쇄 위치 및 크기를 별도로 [요청]
                  하지 않은 주문건에 대한 교환 또는 환불은 불가합니다.
                </p>
              </li>
              <li>
                추가 주문 시 기존 상품 색상과의 컬러 차이
                <p>
                  상품 컬러 및 사이즈는 제작 시기별, 생산시즌별로 원단 컬러와
                  사이즈 차이가 발생할 수 있습니다.
                </p>
              </li>
              <li>
                화학 제품 사용으로 인한 손상
                <p>
                  우레탄 전사(PU Heat Transfer) 인쇄 제품에 솔벤트와 같은
                  용해력이 있는 용매를 사용한 향수를 직접적으로 분사할 경우 인쇄
                  부분이 손상될 수 있으니 주의해 주세요.
                </p>
              </li>
            </ul>
            <p className="produce-info-section">교환/환불 기간</p>
            <p>
              물품에 문제 되는 사항에 대해서는 수령 후 7일 이내 이메일
              help@moti.com 또는 고객센터로 연락주셔야 가능합니다.
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProduceModal;
