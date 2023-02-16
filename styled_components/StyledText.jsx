import React from "react";
import { Text, StyleSheet } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";

const StyledText = ({ style: propStyleObj = {}, children, ...props }) => {
  const styles = useThemedStyles(stylesheetCallback);
  const loadStyles = () => {
    let allstyles = [styles.default, propStyleObj];
    allstyles.push(
      Object.keys(props).map((currentProp) => {
        if (styles[currentProp]) {
          return styles[currentProp];
        }
      })
    );
    return allstyles;
  };
  return <Text style={loadStyles()}>{children}</Text>;
};

const stylesheetCallback = (theme) => {
  return StyleSheet.create({
    default: {
      color: theme.themeTokens.textColor,
      fontSize: theme.typography.size.p,
    },
    bold: {
      fontWeight: "bold",
    },
    h1: {
      fontSize: theme.typography.size.h1,
    },
    h2: {
      fontSize: theme.typography.size.h2,
    },
    h3: {
      fontSize: theme.typography.size.h3,
    },
    h4: {
      fontSize: theme.typography.size.h4,
    },
    h5: {
      fontSize: theme.typography.size.h5,
    },
    p: {
      fontSize: theme.typography.size.p,
    },
    underlined: {
      textDecorationLine: "underline",
    },
    wrapText: {
      flexShrink: 1,
    },
    secondaryColor: {
      color: theme.themeTokens.regularIconColor,
    },
    success: {
      color: theme.themeTokens.successColor,
    },
    error: {
      color: theme.themeTokens.errorColor,
    },
    black: {
      color: theme.themeTokens.colors.black,
    },
    red: {
      color: theme.themeTokens.colors.red,
    },
    blue: {
      color: theme.themeTokens.colors.blue,
    },
    gray: {
      color: theme.themeTokens.colors.gray,
    },
    yellow: {
      color: theme.themeTokens.colors.yellow,
    },
    white: {
      color: theme.themeTokens.colors.white,
    },
    green: {
      color: theme.themeTokens.colors.green,
    },
  });
};

export default StyledText;
