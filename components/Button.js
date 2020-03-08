import styled, { css as _css } from "styled-components";
import { variant, space, system } from "styled-system";
//import tw from "tailwind.macro"
import css from "@styled-system/css";
//import { themeGet } from "@styled-system/theme-get"

const Button = styled("button")(
  /*{
    appearance: "none",
    fontFamily: "inherit",
    border: "1px solid transparent",
    //...tw`px-3 py-2 rounded-sm cursor-pointer`,
    ...css({
      paddingX: 3,
    }),
  },*/
  css({
    border: "1px solid transparent",
    cursor: "pointer",
    paddingX: 3,
    paddingY: 1,
    borderRadius: "sm",
    fontFamily: "mono",
    transition:
      "0.4s background-color ease-in-out, 0.4s color ease-in-out, 0.4s border-color ease-in-out",
    "@media print": {
      display: "none"
    }
  }),
  props => (props.disabled ? { opacity: "0.5", cursor: "auto" } : null),
  variant({
    variants: {
      primary: {
        color: "textContrast",
        bg: "primary",
        borderColor: "primary",
        "&:hover": {
          bg: "primaryDarker"
        }
      },
      secondary: {
        color: "white",
        bg: "secondary"
      },
      [`outline-primary`]: {
        color: "primary",
        borderColor: "primary",
        bg: "transparent"
      }
    }
  }),
  variant({
    prop: "size",
    variants: {
      lg: {
        paddingX: 5,
        paddingY: 2,
        fontSize: "lg"
      }
    }
  }),
  system({ display: true }),
  space
);
export default Button;
