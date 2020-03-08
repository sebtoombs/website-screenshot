import React, { useState, useContext, useEffect } from "react";
import { theme as baseTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const STORAGE_KEY = "sebtoombs-resume-color-mode";

const storage = {
  get: init => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || init;
    } catch (e) {
      console.warn(
        "localStorage is disabled and color mode might not work as expected.",
        "Please check your Site Settings.",
        e
      );
    }
  },
  set: value => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      console.warn(
        "localStorage is disabled and color mode might not work as expected.",
        "Please check your Site Settings.",
        e
      );
    }
  }
};

export const getTheme = mode => {
  if (!mode || mode === `light`) return baseTheme;
  return { ...baseTheme, colors: baseTheme.colors.modes[mode] };
};

export const ColorModeContext = React.createContext();

export const useColorMode = () => {
  const [colorMode, setColorMode] = useContext(ColorModeContext);
  return { colorMode, setColorMode };
};

export const ColorModeProvider = props => {
  const [colorMode, setColorMode] = useState();
  const theme = getTheme(colorMode);

  // initialize state
  useEffect(() => {
    const stored = storage.get();
    if (!stored || stored === colorMode) return;
    setColorMode(stored);
  }, []);

  //Update state on change
  useEffect(() => {
    if (!colorMode) return;
    storage.set(colorMode);
  }, [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={[colorMode, setColorMode]}>
        {props.children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};
