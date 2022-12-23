import { fabric } from 'fabric'
import domtoimage from "dom-to-image";

/* 캔버스 초기화 */
export function initCanvas() {
  return new fabric.Canvas("canvas", {
    width: 180,
    height: 260,
    backgroundColor: "transparent",
  });
}

/* 이미지 업로드 */
export const handleImage = ({canvas, event}) => {
  if (!event) {
    canvas.clear();
  }
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.crossOrigin = "Anomymous";
    imgObj.onload = () => {
      const uploadImg = new fabric.Image(imgObj);
      uploadImg.scaleToHeight(100);
      uploadImg.scaleToWidth(100);
      canvas.centerObject(uploadImg);
      canvas.add(uploadImg);
      canvas.setActiveObject(uploadImg);
      canvas.renderAll();
    };
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(file);
  }
};

/* 텍스트 추가 */
export const addText = ({canvas}) => {
  canvas.add(
    new fabric.IText("Tap and Type", {
      left: 0,
      top: 0,
      fontFamily: "arial black",
      fill: "#333333",
      fontSize: 20,
      crossOrigin: "Anomymous",
    })
  );
};

/* 선택한 텍스트 색상 바꾸기 */
export const setTextColor = ({canvas, event}) => {
  if (
    canvas.getActiveObject() !== undefined &&
    canvas.getActiveObject().text !== undefined
  ) {
    canvas.getActiveObject().set({ fill: event.target.value });
    canvas.renderAll();
  } else {
    console.log("not yet or not a text");
  }
};

/* 이미지 내보내기 */
export const exportImg = async ({productList, editArray, setEditArray, dispatch, inputCart, color, quantitySelect, sizeSelect, productPrice}) => {
  if (editArray.length == 0) {
    alert("편집한 이미지가 없습니다.");
    return;
  } else {
    dispatch(
      inputCart({
        id: productList?.id,
        imgArray: editArray,
        size: sizeSelect.current.value,
        color: color,
        quantity: parseInt(quantitySelect.current.value),
        productPrice: productPrice,
      })
    );
    setEditArray([]);
    alert("편집했던 이미지를 장바구니에 담으셨습니다");
  }
};

/* 편집한 이미지 저장하기, 이미지 반대로 돌리기 포함 */
export const customSave = async ({editZone, editArray, setEditArray, img, setImg, print, setPrint, productList}) => {
  const dataUrl = await domtoimage.toBlob(editZone.current);
  const reader = new FileReader();
  reader.readAsDataURL(dataUrl);
  reader.onload = () => {
    const base64Data = reader.result;
    if (editArray.length >= 2) {
      alert(
        "같은 티셔츠에 대해 앞, 뒷면 사진이 모두 있습니다. 이 이상 저장할 수 없습니다."
      );
      return;
    } else {
      if (editArray.length == 0) {
        alert(
          `${
            print == "front" ? "앞" : "뒷"
          }면 내역을 저장하고, 다음 면으로 넘어갑니다. 한 면만 편집하기로 하셨다면 지금 장바구니 버튼을 눌러주실 수도 있습니다.`
        );
      } else if (editArray.length == 1) {
        alert(
          `${
            print == "front" ? "앞" : "뒷"
          }면 내역을 저장했습니다. 앞 뒤 두 면 모두를 편집하셨습니다.`
        );
      }

      setEditArray(editArray.concat({ print: print, imageUrl: base64Data }));

      for (let i = 0; i < productList.productImg.length; i++) {
        if (img == productList.productImg[i] && i % 2 == 0) {
          setImg(productList.productImg[i + 1]);
          setPrint("back");
        } else if (img == productList.productImg[i] && i % 2 == 1) {
          setImg(productList.productImg[i - 1]);
          setPrint("front");
        }
      }
    }
  };
};

/* 앞, 뒷면 이미지 편집 내역 삭제 */
export const customErase = ({setEditArray}) => {
  const choice = window.confirm(
    "편집했던 내역을 삭제하시겠습니까? 확인을 누르시면 삭제, 취소를 누르시면 보존됩니다."
  );
  if (choice) {
    setEditArray([]);
    alert("편집 내역이 초기화되었습니다.");
  } else {
    alert("편집 내역이 유지됩니다.");
    return;
  }
};