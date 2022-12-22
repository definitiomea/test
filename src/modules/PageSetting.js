export function QuantityOption() {
  const quantity = [];
  for (let i = 1; i < 999; i++) {
    quantity.push(<option key={i}>{i}</option>);
  }
  return quantity;
}

export function SizeOption({productList}) {
  /* 컴포넌트 식으로 만들고 싶다면 return을 필히 */
  return(
    productList?.size.map((selectSize, index) => (
      <option key={index}>{selectSize}</option>
    ))
  );
}

/* 셔츠 뒤집기 */
export const flipShirts = ({productList, img, setImg, setPrint}) => {
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

export const changeShirtColor = ({productList, setImg, setColor, setPrint, setEditArray, index}) => {
  setImg(productList.productImg[index * 2]);
  setColor(productList.colorName[index]);
  setPrint("front");
  setEditArray([]);
};