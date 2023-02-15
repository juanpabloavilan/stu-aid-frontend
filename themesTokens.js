const DARK_THEME_COLORS = {
  black: "#202123",
  blackGray: "#2c2c2e",
  red: "#de5f58",
  gray: "#a1a1a3",
  blue: "#3f7fe8",
  yellow: "#f1c423",
  white: "#e8e8e8",
  green: "#66be67",
};

const DARK_THEME = {
  textColor: DARK_THEME_COLORS.white,
  backgroundColor: DARK_THEME_COLORS.black,
  secondaryBackgroundColor: DARK_THEME_COLORS.blackGray,
  successColor: DARK_THEME_COLORS.green,
  errorColor: DARK_THEME_COLORS.red,
  regularIconColor: DARK_THEME_COLORS.gray,
  colors: {
    ...DARK_THEME_COLORS,
  },
};

const LIGHT_THEME_COLORS = {
  white: "f9f9f9",
  whiteGray: "#eceef4",
  red: "#f18c8e",
  gray: "#73777f",
  black: "#222835",
  blue: "#6886c5",
  yellow: "#ffe0ac",
  green: "#2aaa8a",
};

const LIGHT_THEME = {
  textColor: LIGHT_THEME_COLORS.black,
  backgroundColor: LIGHT_THEME_COLORS.white,
  secondaryBackgroundColor: LIGHT_THEME_COLORS.whiteGray,
  successColor: LIGHT_THEME_COLORS.green,
  errorColor: LIGHT_THEME_COLORS.red,
  regularIconColor: LIGHT_THEME_COLORS.gray,
  colors: {
    ...LIGHT_THEME_COLORS,
  },
};

const TYPOGRAPHY = {
  size: {
    h1: 24,
    h2: 22,
    h3: 20,
    h4: 16,
    h5: 14,
    p: 12,
  },
};

export const themeTokens = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  typography: TYPOGRAPHY,
};
