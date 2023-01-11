import React, { useContext } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";

const useThemedStyles = (stylesheetCallback) => {
  const { theme } = useContext(ThemeContext);
  return stylesheetCallback(theme);
};

export default useThemedStyles;
