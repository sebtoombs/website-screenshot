import App from "next/app";
import React from "react";

import { ColorModeProvider } from "../style";
import GlobalStyles from "../style/GlobalStyles";
import "../style/layout.css";

class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ColorModeProvider>
        <GlobalStyles bg="pageBackground" color="text" fontFamily="body" />
        <Component {...pageProps} />
      </ColorModeProvider>
    );
  }
}

export default NextApp;
