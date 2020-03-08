import styled from "styled-components";
import css from "@styled-system/css";
import React, { forwardRef } from "react";
import Box from "@components/Box";

const CanvasButtonStyled = styled("button")(
  css({
    border: "1px solid",
    borderColor: "lightText",
    p: 2
  }),
  props =>
    props.active
      ? css({ borderColor: "primary", bg: p => `${p.colors.primary}60` })
      : null
);

const CanvasButton = forwardRef((props, ref) => {
  return (
    <Box css={{ paddingBottom: "65%", position: "relative" }}>
      <CanvasButtonStyled
        type="button"
        css={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%"
        }}
        {...props}
      >
        <canvas
          ref={ref}
          css={{
            position: "relative",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%"
          }}
        />
      </CanvasButtonStyled>
    </Box>
  );
});

export default CanvasButton;
