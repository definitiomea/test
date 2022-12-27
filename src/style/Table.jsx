import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
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

  // 미디어쿼리 추가할 것
`;

function MyTable({ children, ...rest }) {
  return <StyledTable {...rest}>{children}</StyledTable>;
}

export default MyTable;
