//import css from "@styled-system/css"
import styled from "styled-components"
import { compose, typography, color, space, system } from "styled-system"

/*const Text = styled.span`
  ${compose(typography, color, space)}
  ${system({
    display: true,
  })}
`*/
const Text = styled("span")(
  compose(typography, color, space),
  system({ display: true })
)

export default Text
