//import css from "@styled-system/css"
import styled from "styled-components";
import {
  compose,
  color,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  typography
} from "styled-system";

const Box = styled("div")(
  compose(
    typography,
    color,
    space,
    layout,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow
  )
);

export default Box;
