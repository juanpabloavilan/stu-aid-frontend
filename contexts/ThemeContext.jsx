import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ ThemeTokens, children }) => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const theme = {
    currentTheme,
    setCurrentTheme,
    themeTokens: ThemeTokens[currentTheme],
    typography: ThemeTokens["typography"],
  };
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
