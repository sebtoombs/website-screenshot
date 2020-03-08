import styled from "styled-components";
import css from "@styled-system/css";
import { color, space, compose, border, layout } from "styled-system";

const Container = styled("div")(
  compose(color, space, border, layout),
  css({
    maxWidth: ["xs", "sm", "md", "lg", "xl"],
    paddingX: [4, 2],
    marginX: "auto"
  })
);
export default Container;
