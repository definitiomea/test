export function QuantityOption() {
  const quantity = [];
  for (let i = 1; i < 999; i++) {
    quantity.push(<option key={i}>{i}</option>);
  }
  return quantity;
}