const Delivery = ({
  stateText,
  toName,
  carrierName,
  carrierTel,
  carrierId,
}) => {
  return (
    <div>
      <p>배송 상태: {stateText}</p>
      <p>받는 사람: {toName}</p>
      <p>
        택배사: {carrierName}
        {carrierTel}
      </p>
      <p>송장번호: {carrierId}</p>
    </div>
  );
};

export default Delivery;
