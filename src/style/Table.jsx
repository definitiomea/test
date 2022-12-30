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
  .table-product-container img {
    width: 120px;
    margin-right: 0.5rem;
    background-color: #dee2e6;
  }
  .table-product-container > div {
    margin-left: 1rem;
  }
  .table-product-container .table-product-name {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .table-product-container .table-product-label {
    margin-right: 0.5rem;
    color: #adb5bd;
  }
  .table-product-container span:last-child {
    color: #000000;
  }

  .table-media-query {
    display: none;
  }

  // 미디어쿼리 추가할 것
  @media screen and (max-width: 960px) {
    tr {
      grid-template-columns: 5fr repeat(3, 2fr);
      padding: 1.2rem 0;
    }
    thead tr th:nth-child(2),
    tbody tr td:nth-child(2) {
      display: none;
    }
    .table-media-query {
      display: block;
    }
  }
`;

function MyTable({ children, ...rest }) {
  return <StyledTable {...rest}>{children}</StyledTable>;
}

export default MyTable;
