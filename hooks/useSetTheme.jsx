import React, { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useSetTheme = () => {
  const { theme } = useContext(ThemeContext);
  const { currentTheme } = theme;

  useLayoutEffect(() => {
    const setTheme = () => {
      const time = new Date().getHours();
      if (time >= 5 && time <= 17) {
        console.log("Setting light mode");
        theme.setCurrentTheme("light");
      } else {
        console.log("Setting dark mode");
        theme.setCurrentTheme("dark");
      }
    };
    setTheme();
    console.log(currentTheme);
  }, [currentTheme, theme]);

  return currentTheme;
};

export default useSetTheme;
