import styled from "styled-components";
import css from "@styled-system/css";

const Input = styled("input")(
  css({
    border: "1px solid",
    borderColor: "text",
    bg: "transparent",
    borderRadius: "sm",
    fontFamily: "mono",
    paddingX: 3,
    paddingY: 1,
    display: "block",
    width: "100%",
    "&:focus": {
      bg: "white"
    }
  })
);
export default Input;
