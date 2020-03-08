import styled from "styled-components"
import css from "@styled-system/css"
import { color, space, compose, border, layout } from "styled-system"

//console.log(css({ marginX: "auto" }))
const Col = styled.div`
  ${compose(color, space, border, layout)}
  ${css({
    paddingX: 2,
  })}
`
export default Col
