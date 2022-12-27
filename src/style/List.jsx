import styled from "styled-components";

const StyledList = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  > div {
    display: grid;
    grid-template-columns: 5fr 1fr repeat(3, 2fr);
    gap: 1.5rem;
    align-items: center;
    justify-items: center;
    padding: 1.2rem;
    &.label {
      font-weight: bold;
      border-bottom: 1px solid lightgray;
    }
    &.item-empty {
      min-height: 180px;
      grid-template-columns: 1fr;
      color: lightgray;
    }
  }
  // 미디어쿼리 추가할 것
`;

function List({ children, ...rest }) {
  return <StyledList {...rest}>{children}</StyledList>;
}

export default List;
