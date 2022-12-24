// 전역 스타일

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "ongothic";
  }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  // 푸터 하단 고정
  #wrapper {
    height: auto;
    min-height: 100%;
  }
  .footer {
    height: 100px;
    width: 100%;
    background-color: black;
    color: #f8f9fa;
  }
  .hidden {
    display: none;
  }
  // 네브 제외 콘텐츠, 네브바 아래 위치하게
  .body-container {
    position: relative;
    top: 136px; // 네브바 높이
  }
  // 메인(home) 페이지에서는 네브바가 겹쳐야하므로 제외
  .main-container {
    width: 100%;
    position: absolute;
    top: -136px; // 네브바 높이
  }

  // 필요에 따라 스타일 추가, 수정
`;

export default GlobalStyle;

// index.js에서 임포트해서 사용
