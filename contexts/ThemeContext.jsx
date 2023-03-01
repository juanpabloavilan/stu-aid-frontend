import React, { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ ThemeTokens, children }) => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const theme = useMemo(
    () => ({
      currentTheme,
      themeTokens: ThemeTokens[currentTheme],
      typography: ThemeTokens["typography"],
      setCurrentTheme,
    }),
    [currentTheme, ThemeTokens, setCurrentTheme]
  );
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
