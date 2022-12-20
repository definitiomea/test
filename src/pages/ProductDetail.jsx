import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fabric } from "fabric";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
/* import 'fabric-history'; */

import FabricSettings from "../modules/FabricSettings";
import InitCanvas from "../modules/InitCanvas";
import QuantityOption from "../modules/QuantityOption";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

import { inputCart } from "../redux/reducers/cart";

const ProductDetail = () => {
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState(null);
  const [print, setPrint] = useState("front");
  const [editArray, setEditArray] = useState([]);

  const { id } = useParams(); // id : productList {id}

  const editZone = useRef(null);
  const sizeSelect = useRef(null);
  const quantitySelect = useRef(null);

  const dispatch = useDispatch();

  /* 셋팅 불러오기 */
  FabricSettings();

  /* 각각의 티셔츠 받아오기 */
  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  /* 제품의 가격 */
  const productPrice = parseInt(productList?.price.replace(",", ""));

  /* 셔츠 뒤집기 */
  const flipShirts = () => {
    for (let i = 0; i < productList.productImg.length; i++) {
      if (img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
        setPrint("back");
      } else if (img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
        setPrint("front");
      }
    }
  };

  /* 셔츠 색상 바꾸기 */
  const changeShirtColor = (index) => {
    setImg(productList.productImg[index * 2]);
    setColor(productList.colorName[index]);
    setEditArray([]);
  };

  /* 텍스트 색상 바꾸기 */
  const setTextColor = (event) => {
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

  /* 이미지 업로드하기 */
  const handleImage = (event) => {
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

  /* 텍스트 추가하기 */
  const addText = () => {
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

  /* 편집한 이미지가 없다고 할 때 현재 캔버스를 넣어주는 시도를 했지만,
  아마도 비동기이기 때문에? editArray.concat이 늦게 반영되는 상황이 벌어졌고 dispatch와 타이밍을 맞추지 못하게 됐어요
  
  이럴 바에 차라리 편집 내역이 들어간 배열의 길이를 따져서 dispatch를 조건부로 넘겨주는 걸로 생각하고,
  그대로 실행해서 성공 */

  /* 이미지 내보내기, 장바구니 버튼에 연결하는 걸로 */
  const exportImg = async () => {
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

  /* 이미지 저장  */
  const customSave = async () => {
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

  /* 이미지 초기화 */
  const customErase = () => {
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

  /* 페이지가 로딩되면 제품 정보를 받고, 캔버스를 정해주면 되므로 */
  useEffect(() => {
    getProduct();
    setCanvas(InitCanvas());
  }, [id]);

  /* 제품 정보가 로딩되면 기본 이미지와 기본 색상 정보가 있어야 하므로 */
  useEffect(() => {
    if (productList != null) {
      setImg(productList.productImg[0]);
      setColor(productList.colorName[0]);
    }
  }, [productList]);

  return (
    <div className="product-area">
      <div className="product-button">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            flipShirts();
          }}
        >
          앞/뒤 뒤집기
        </Button>
        {/* <Button variant="contained" color="success" onClick={() => {add()}}>도형 생성</Button> */}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleImage(event);
          }}
        />
        {/* <Button variant="contained" color="success" onClick={() => {}}>사진 삭제</Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            addText();
          }}
        >
          텍스트 추가하기
        </Button>
        <input type="color" onChange={(event) => setTextColor(event)}></input>
        {/* <Button variant="contained" color="success">이미지 편집</Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.undo();
          }}
        >
          편집 되돌리기
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.redo();
          }}
        >
          편집 되돌리기 취소
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            canvas.clear();
          }}
        >
          이미지, 편집 전체 삭제
        </Button>
        {/* <Button onClick={() => {download()}}>시험용 다운로드</Button> */}
        <Button
          onClick={() => {
            exportImg();
          }}
        >
          이미지 내보내기(dispatch)
        </Button>
        <Button
          onClick={() => {
            customSave();
          }}
        >
          편집한 면의 이미지 저장
        </Button>
        <Button
          onClick={() => {
            customErase();
          }}
        >
          앞, 혹은 뒷면 이미지 편집 내역 지우기
        </Button>
      </div>

      <div className="product-detail" ref={editZone}>
        <div className="img-box">
          {productList?.category == "short" && img != null ? (
            <img
              className="product-img"
              src={require(`../img/shirts-img/short/${img}`)}
            ></img>
          ) : (
            ""
          )}
          {productList?.category == "long" && img != null ? (
            <img
              className="product-img"
              src={require(`../img/shirts-img/long/${img}`)}
            ></img>
          ) : (
            ""
          )}
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "350px",
              height: "420px",
            }}
          >
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>

      <div className="product-info">
        {productList ? <p>{productList.id}</p> : ""}
        {productList ? <p>{productList.productName}</p> : ""}
        {productList ? <p>{productList.price}</p> : ""}
        <div style={{ display: "flex" }}>
          {productList
            ? productList.color.map((color, index) => (
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    border: "1px solid transparent",
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    changeShirtColor(index);
                  }}
                  key={index}
                ></div>
              ))
            : ""}
        </div>

        <select style={{ width: "100px" }} ref={sizeSelect}>
          {productList?.size.map((size, index) => (
            <option key={index}>{size}</option>
          ))}
        </select>

        <select name="" id="" ref={quantitySelect}>
          <QuantityOption></QuantityOption>
        </select>

        <div>
          <Button>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
          </Button>
          <Button>구매하기</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
