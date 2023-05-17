import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  :root {
    /* Color */
    --color-white: #ffffff;
    --color-input: #F5F9FC;
    --color-hover: #CFE9FD;
    --color-shadow: #3c4a5645;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    height: 100%;
  }

  button, input, textarea, select {
    border: none;
    outline: none;
    resize: none;
    -webkit-appearance: none; 
    // 기본 CSS로 구현되어 있는 select의 화살표를 삭제해 준다.
  }
`;
export default GlobalStyles;
