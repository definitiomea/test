// 전역 스타일

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    // font-family: ;
  }

  h2 {
    font-weight: bold;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  // 필요에 따라 스타일 추가, 수정
`;

export default GlobalStyle;

// index.js에서 임포트해서 사용
