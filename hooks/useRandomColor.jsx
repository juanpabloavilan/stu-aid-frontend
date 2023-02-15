import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useRandomColor = (id) => {
  const { theme } = useContext(ThemeContext);
  const colors = theme.themeTokens.colors;
  const colorsKeys = Object.keys(colors).filter((color) => {
    return !color.includes("white") && !color.includes("black");
  });
  const randomKeyColor = colorsKeys[id % colorsKeys.length];

  return colors[randomKeyColor];
};

export default useRandomColor;
