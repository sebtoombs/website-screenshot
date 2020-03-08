import styled from "styled-components"
import css from "@styled-system/css"
import { flexbox } from "styled-system"

//console.log(css({ marginX: "auto" }))
const Row = styled.div`
  ${flexbox}
  ${css({
    display: "flex",
    flexWrap: "wrap",
    marginX: -2,
  })}
`
export default Row
