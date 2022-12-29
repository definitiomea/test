import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  word-break: keep-all;
  text-align: center;
  tr {
    display: grid;
    grid-template-columns: 4fr repeat(4, 2fr);
    gap: 1.5rem;
    align-items: center;
    justify-items: center;
    padding: 1.2rem;
  }
  thead tr {
    border-bottom: 1px solid lightgray;
  }
  thead tr th {
    text-align: center;
    border: none;
    font-weight: bold;
  }

  .item-empty {
    min-height: 180px;
    grid-template-columns: 1fr;
    color: lightgray;
    border: none;
  }

  .table-product-container {
    display: flex;
    justify-self: left;
    align-items: center;
    text-align: left;
  }
  .table-product-container > div {
    margin-left: 1rem;
  }
  .table-product-container > div > div:first-child {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .table-product-container > div > div:nth-child(2),
  .table-product-container > div > div:nth-child(3) {
    color: #adb5bd;
  }
  .table-product-container span {
    color: #000000;
    margin-left: 0.5rem;
  }
  .table-product-container img {
    width: 120px;
    min-width: 120px;
    min-height: 120px;
    margin-right: 0.5rem;
    background-color: #dee2e6;
  }

  // 미디어쿼리 추가할 것
  @media screen and (max-width: 768px) {
    .table-product-container img {
      display: none; /* 상품 이미지가 보이지 않게 */
    }
  }
`;

function MyTable({ children, ...rest }) {
  return <StyledTable {...rest}>{children}</StyledTable>;
}

export default MyTable;
