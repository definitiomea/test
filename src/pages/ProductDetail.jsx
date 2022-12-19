import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fabric } from 'fabric';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import 'fabric-history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

import { inputCart } from '../redux/reducers/cart'

const ProductDetail = () => {
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState(null);
  const [print, setPrint] = useState('front');
  const [editArray, setEditArray] = useState([]);

  /* 시험 삼아서 이 state에 저장한다 치고, */
  const [path, setPath] = useState([]);

  const { id } = useParams(); // id : productList {id}
  
  const test = useRef(null);
  const sizeSelect = useRef(null);
  const quantitySelect = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
    // console.log(productList);
  }

  const flipShirts = () => {
    for(let i = 0; i < productList.productImg.length; i++) {
      if(img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
        setPrint('back');
      }
      else if(img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
        setPrint('front');
      }
    }
  }

  const changeShirtColor = (index) => {
    setImg(productList.productImg[index * 2]);
    setColor(productList.colorName[index]);
    setEditArray([]);
  }

  const initCanvas = () => {
    return new fabric.Canvas('canvas', {
      width: 350,
      height: 420,
      backgroundColor: "transparent",
    })
  }

  let deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  let delImg = new Image();
  delImg.src = deleteIcon;
  delImg.crossOrigin = "Anomymous";

  let flipIcon = "https://cdn-icons-png.flaticon.com/512/1827/1827961.png";
  let flipImg = new Image();
  flipImg.src = flipIcon;
  flipImg.crossOrigin = "Anomymous";

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "blue";
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.crossOrigin = "Anomymous";

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon(delImg),
    cornerSize: 24,
  });

  fabric.Object.prototype.controls.flipControl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -16,
    cursorStyle: "pointer",
    mouseUpHandler: flipObject,
    render: renderIcon(flipImg),
    cornerSize: 24,
  });

  function deleteObject (eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  function flipObject (eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    target.toggle('flipX', true);
    canvas.setActiveObject(target);
    canvas.renderAll();
  }

  function renderIcon(icon) {
    return function renderIcon (ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  const setTextColor = (event) => {
    if(canvas.getActiveObject() !== undefined && canvas.getActiveObject().text !== undefined) {
      canvas.getActiveObject().set({fill: event.target.value})
      canvas.renderAll();
    }
    else {
      console.log("not yet or not a text");
    }
  }

  const add = () => {
    let rect = new fabric.Rect({
      left: 60,
      top: 50,
      fill: "yellow",
      width: 100,
      height: 100,
      objectCaching: false,
      stroke: "lightgreen",
      strokeWidth: 4,
      crossOrigin: "Anomymous"
    });
    
    canvas.add(rect);
    canvas.setActiveObject(rect);
  }

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
      }
    }
    if(event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }

  const addText = () => { 
    canvas.add(new fabric.IText('Tap and Type', { 
        left: 0,
        top: 0,
        fontFamily: 'arial black',
        fill: "#333333",
        fontSize: 20,
        crossOrigin: "Anomymous"
    }));
  }

   const download = () => {
    domtoimage.toBlob(test.current).then(function (dataUrl) {
      dataUrl.crossOrigin = "Anomymous";
      
      window.saveAs(dataUrl, '');
    })
  }

  const productPrice = parseInt(productList?.price.replace(",", ""));
  
  /* 편집한 이미지가 없다고 할 때 현재 캔버스를 넣어주는 시도를 했지만,
  아마도 비동기이기 때문에? editArray.concat이 늦게 반영되는 상황이 벌어졌고 dispatch와 타이밍을 맞추지 못하게 됐어요
  이럴 바에 차라리 편집 내역이 들어간 배열의 길이를 따져서 dispatch를 조건부로 넘겨주는 걸로 생각하고,
  그대로 실행해서 성공 */
  const exportImg = async () => {
    if(editArray.length == 0) {
      alert('편집한 이미지가 없습니다.');
      return;
    }
    /* const dataUrl = await domtoimage.toBlob(test.current);
    const reader = new FileReader();
    reader.readAsDataURL(dataUrl);
    reader.onload = () => {
      const base64Data = reader.result;
      if(editArray.length == 0) {
        setEditArray(editArray.concat({print: print, imageUrl: base64Data}));
      }
    } */
    else {
      dispatch(inputCart({id: productList?.id, /* img: base64Data, */ imgArray: editArray, size: sizeSelect.current.value, color: color, quantity: parseInt(quantitySelect.current.value), /* print: print, */ productPrice: productPrice}))
      setEditArray([]);
      alert('편집했던 이미지를 장바구니에 담으셨습니다');
    }
  }

  const customFlip = async () => {
    const dataUrl = await domtoimage.toBlob(test.current);
    const reader = new FileReader();
    reader.readAsDataURL(dataUrl);
    reader.onload = () => {
      const base64Data = reader.result;
      /* 여기에서 이미지를 배열에 추가하고, 객체에 앞, 뒷면 state를 추가한 뒤 앞 뒷면을 setImg로 뒤집으면? */
        if(editArray.length >= 2) {
          alert('같은 티셔츠에 대해 앞, 뒷면 사진이 모두 있습니다. 이 이상 저장할 수 없습니다.')
          return;
        }
        else {
          if(editArray.length == 0) {
            alert(`${print == 'front' ? '앞' : '뒷'}면 내역을 저장하고, 다음 면으로 넘어갑니다. 한 면만 편집하기로 하셨다면 지금 장바구니 버튼을 눌러주실 수도 있습니다.`);
          }
          else if(editArray.length == 1) {
            alert(`${print == 'front' ? '앞' : '뒷'}면 내역을 저장했습니다. 앞 뒤 두 면 모두를 편집하셨습니다.`);
          }
          
          setEditArray(editArray.concat({print: print, imageUrl: base64Data}));
      
          for(let i = 0; i < productList.productImg.length; i++) {
            if(img == productList.productImg[i] && i % 2 == 0) {
              setImg(productList.productImg[i + 1]);
              setPrint('back');
            }
            else if(img == productList.productImg[i] && i % 2 == 1) {
              setImg(productList.productImg[i - 1]);
              setPrint('front');
            }
          }
        }
      }
  }

  const customErase = () => {
    const choice = window.confirm('편집했던 내역을 삭제하시겠습니까? 확인을 누르시면 삭제, 취소를 누르시면 보존됩니다.');
    if(choice) {
      setEditArray([]);
      alert('편집 내역이 초기화되었습니다.')
    }
    else {
      alert('편집 내역이 유지됩니다.')
      return;
    }
  }

  /* const ImageTest = () => {
    return (
      <div>
        {path ? path.map((img, index) => (
            <div>
              <h3>{img.name} {index}</h3>
              <img src={img.imageUrl}></img>
            </div>)) : ""}
      </div>
    );
  } */

  const quantityOption = () => {
    const quantity = [];
    for(let i = 1; i < 999; i++) {
      quantity.push(<option key={i}>{i}</option>)
    }
    return quantity;
  }

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(()=>{
    if(productList != null) {
      setImg(productList.productImg[0])
      setColor(productList.colorName[0])
    }
  }, [productList])

  /* 하지만 useEffect를 통해서 path 배열 안에 여러 개가 추가되는지 확인하려고 했을 때 문제도 생겼고.. */
  useEffect(() => {
    console.log(editArray);
  }, [editArray]);

  return (
    <div className="product-area">

      <div className="product-button">
        <Button variant="contained" color="success" onClick={() => {flipShirts()}}>앞/뒤 뒤집기</Button>
        {/* <Button variant="contained" color="success" onClick={() => {add()}}>도형 생성</Button> */}
        <input type="file" accept="image/*" onChange={(event) => {handleImage(event)}} />
        {/* <Button variant="contained" color="success" onClick={() => {}}>사진 삭제</Button> */}
        <Button variant="contained" color="success" onClick={() => {addText()}}>텍스트 추가하기</Button>
        <input type="color" onChange={(event) => setTextColor(event)}></input>
        {/* <Button variant="contained" color="success">이미지 편집</Button> */}
        <Button variant="contained" color="success" onClick={() => {canvas.undo()}}>편집 되돌리기</Button>
        <Button variant="contained" color="success" onClick={() => {canvas.redo()}}>편집 되돌리기 취소</Button>
        <Button variant="contained" color="success" onClick={() => {canvas.clear()}}>이미지, 편집 전체 삭제</Button>
        {/* <Button onClick={() => {download()}}>시험용 다운로드</Button> */}
        <Button onClick={() => {exportImg()}}>이미지 내보내기(dispatch)</Button>
        <Button onClick={() => {customFlip()}}>편집한 면의 이미지 저장</Button>
        <Button onClick={() => {customErase()}}>앞, 혹은 뒷면 이미지 편집 내역 지우기</Button>
      </div>

      <div className="product-detail" ref={test}>
        <div className="img-box">
          {productList?.category == "short" && img != null ?
            <img className="product-img" src={require(`../img/shirts-img/short/${img}`)}></img> :
          ""}
          {productList?.category == "long" && img != null ?
            <img className="product-img" src={require(`../img/shirts-img/long/${img}`)}></img> :  
          ""}
          <div style={{position: "absolute", top: "0%", left: "0%", width: "350px", height: "420px"}}>
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>

      <div className="product-info">
          {productList ? <p>{productList.id}</p> : ""}
          {productList ? <p>{productList.productName}</p> : ""}
          {productList ? <p>{productList.price}</p> : ""}
          <div style={{display: "flex"}}>
            {productList ? productList.color.map((color, index) => 
              <div style={{width: "15px", height: "15px", border: "1px solid transparent", borderRadius: "50%", backgroundColor: color}} onClick={() => {changeShirtColor(index)}} key={index}></div>) :
            ""}
          </div>

          <select style={{width: "100px"}} ref={sizeSelect}>
            {productList?.size.map((size, index) => <option key={index}>{size}</option>)}
          </select>

          <select name="" id="" ref={quantitySelect}>
            {quantityOption()}
          </select>

          <div>
            <Button><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon></Button>
            <Button>구매하기</Button>
          </div>
        </div>

        {/** 이미지 데이터 넘기기 테스트 */}
        {/* <ImageTest></ImageTest> */}

    </div>
  );
}
 
export default ProductDetail;