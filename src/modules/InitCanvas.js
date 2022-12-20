import { fabric } from 'fabric'

function InitCanvas() {
  return new fabric.Canvas("canvas", {
    width: 350,
    height: 420,
    backgroundColor: "transparent",
  });
}

export default InitCanvas;