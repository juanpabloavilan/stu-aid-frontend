import React from "react";
import { View, StyleSheet } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";

const StyledView = ({ style: propStyle = {}, children, ...props }) => {
  const styles = useThemedStyles(stylesheetCallback);
  const loadStyles = () => {
    let allStyles = [styles.default, propStyle];
    allStyles.push(
      Object.keys(props).map((currentProp) => {
        if (styles[currentProp]) {
          return styles[currentProp];
        }
      })
    );

    return allStyles;
  };

  return <View style={loadStyles()}>{children}</View>;
};

const stylesheetCallback = (theme) =>
  StyleSheet.create({
    default: {
      backgroundColor: theme.themeTokens.backgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    bgSecondary: {
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
    },
    rounded: {
      borderRadius: 5,
    },
    flexRow: {
      flexDirection: "row",
    },
    alignCenter: {
      alignItems: "center",
    },
    justifyCenter: {
      justifyContent: "center",
    },
    main: {
      color: theme.themeTokens.textColor,
      flex: 1,
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: theme.themeTokens.backgroundColor,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    success: {
      backgroundColor: theme.themeTokens.successColor,
    },
    error: {
      backgroundColor: theme.themeTokens.errorColor,
    },
    black: {
      backgroundColor: theme.themeTokens.colors.black,
    },
    red: {
      backgroundColor: theme.themeTokens.colors.red,
    },
    blue: {
      backgroundColor: theme.themeTokens.colors.blue,
    },
    gray: {
      backgroundColor: theme.themeTokens.colors.gray,
    },
    yellow: {
      backgroundColor: theme.themeTokens.colors.yellow,
    },
    white: {
      backgroundColor: theme.themeTokens.colors.white,
    },
    green: {
      backgroundColor: theme.themeTokens.colors.green,
    },
  });

export default StyledView;
