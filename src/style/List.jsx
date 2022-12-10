import styled from "styled-components";

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  ${"li"} {
    display: grid;
    grid-template-columns: 4fr 2fr 2fr 2fr 2fr;
    gap: 1.5rem;
    align-items: center;
    justify-items: center;
    padding: 1.2rem;
    &.label {
      font-weight: bold;
      border-bottom: 1px solid lightgray;
    }
    &.product-empty {
      min-height: 240px;
      grid-template-columns: 1fr;
      color: lightgray;
    }
  }
`;

function List({ children, ...rest }) {
  return <StyledList {...rest}>{children}</StyledList>;
}

export default List;

// 1. 쓰고자하는 컴포넌트에서 임포트
// import List from "../style/StyledList"
// 2. 태그로 감싸서 사용
// <List>...</List>

// 스타일 수정 > () 안에 컴포넌트 이름
// const NewList = styled(List)`
//   border-top: none;
//   ...
// `;
