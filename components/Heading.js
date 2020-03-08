import css from "@styled-system/css"
import styled from "styled-components"
import { compose, typography, color, space } from "styled-system"

const Heading = styled.span`
  ${css({
    display: "block",
  })}
  ${compose(typography, color, space)}
`

export default Heading
