//import React from "react"
import styled from "styled-components"
import { space, compose } from "styled-system"
import css from "@styled-system/css"

const Card = styled("div")(
  css({
    bg: "cardBackground",
    borderRadius: "sm",
    paddingX: 4,
    paddingY: 5,
  }),
  compose(space)
)
export default Card
