import { createGlobalStyle } from "styled-components";
import { color } from "styled-system";
import css from "@styled-system/css";

//import style from "./layout.css";

const GlobalStyles = createGlobalStyle`
  body {
    ${color}
    ${css({ fontFamily: "body" })}
  }
`;

//const GlobalStyles = createGlobalStyle`${`css(style)`} body { background: #ff0000; }`

export default GlobalStyles;
