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
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
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
  });

export default StyledView;
