import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import useThemedStyles from "../hooks/useThemedStyles";

const StyledButton = ({ style, onPress, children, ...restOfProps }) => {
  const styles = useThemedStyles(stylesCallback);
  const [styleProps, setStyleProps] = useState([]);

  useEffect(() => {
    const stylePropsArray = Object.keys(restOfProps)
      .filter((currentProp) => styles[currentProp])
      .map((currentProp) => styles[currentProp]);
    setStyleProps(stylePropsArray);
  }, []);

  return (
    <Pressable onPress={onPress}>
      <View style={[...styleProps, style]}>{children}</View>
    </Pressable>
  );
};

export default StyledButton;

const stylesCallback = (theme) =>
  StyleSheet.create({
    padding: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    rounded: {
      borderRadius: 5,
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
    lightGray: {
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
    },
  });
