import useThemedStyles from "../hooks/useThemedStyles";
import { View } from "react-native";
import { StyleSheet } from "react-native";

const NavBar = ({ children }) => {
  const styles = useThemedStyles(stylesheetCallback);
  return <View style={styles.navBar}>{children}</View>;
};

const stylesheetCallback = (theme) =>
  StyleSheet.create({
    navBar: {
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  });

export default NavBar;
