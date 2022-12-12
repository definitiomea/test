import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fabric } from 'fabric';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import 'fabric-history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

const ProductDetail = () => {
  const [productList, setProductList] = useState(null);
  const [img, setImg] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [path, setPath] = useState([]);

  const { id } = useParams(); // id : productList {id}
  const test = useRef(null);

  const getProduct = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
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

  const flipShirts = () => {
    for(let i = 0; i < productList.productImg.length; i++) {
      if(img == productList.productImg[i] && i % 2 == 0) {
        setImg(productList.productImg[i + 1]);
      }
      else if(img == productList.productImg[i] && i % 2 == 1) {
        setImg(productList.productImg[i - 1]);
      }
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

      let testImg = new Image();
      testImg.src = dataUrl;
      testImg.crossOrigin = "Anomymous";
      
      window.saveAs(dataUrl, '');
      console.log(dataUrl);
      console.log(testImg);
      console.log(testImg.src);

      /* setPath(...path, path.push(dataUrl)); */
    })
  }

  const exportImg = () => {
    /* 이쪽으로 코드를 쓰면 uint8array 쓰는 게 확정이기 때문에.... 미루고

     domtoimage.toPixelData(test.current).then(function (pixels) {
      for (let y = 0; y < test.current.scrollHeight; ++y) {
        for (let x = 0; x < test.current.scrollWidth; ++x) {
          pixels.pixelAtXYOffset = (4 * y * test.current.scrollHeight) + (4 * x);
          pixels.pixelAtXY = pixels.slice(test.current.pixelAtXYOffset, test.current.pixelAtXYOffset + 4);
        }
      }
      
      console.log(pixels);
      console.log(pixels.pixelAtXY);
    }); */


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
    }
  }, [productList])

  /* useEffect(() => {
    console.log(path);
  }, [path]); */

  return (
    <div className="product-area">

      <div className="product-button">
        <Button variant="contained" color="success" onClick={() => {flipShirts()}}>앞/뒤</Button>
        <Button variant="contained" color="success" onClick={() => {add()}}>도형 생성</Button>
        <input type="file" accept="image/*" onChange={(event) => {handleImage(event)}} />
        <Button variant="contained" color="success" onClick={() => {}}>사진 삭제</Button>
        <Button variant="contained" color="success" onClick={() => {addText()}}>텍스트</Button>
        <input type="color" onChange={(event) => setTextColor(event)}></input>
        <Button variant="contained" color="success">이미지 편집</Button>
        <Button variant="contained" color="success" onClick={() => {canvas.undo()}}>되돌리기</Button>
        <Button variant="contained" color="success" onClick={() => {canvas.redo()}}>되돌리기 취소</Button>
        <Button variant="contained" color="success" onClick={() => {canvas.clear()}}>이미지 전체 삭제</Button>
        <Button onClick={() => {download()}}>시험용 다운로드</Button>
        <Button onClick={() => {exportImg()}}>이미지 내보내기 테스트</Button>
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
              <div style={{width: "15px", height: "15px", border: "1px solid transparent", borderRadius: "50%", backgroundColor: color}} onClick={() => {setImg(productList.productImg[index * 2])}} key={index}></div>) :
            ""}
          </div>

          <select style={{width: "100px"}}>
            {productList?.size.map((size, index) => <option key={index}>{size}</option>)}
          </select>

          <div>
            <Button><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon></Button>
            <Button>구매하기</Button>
          </div>
        </div>
    </div>
  );
}
 
export default ProductDetail;