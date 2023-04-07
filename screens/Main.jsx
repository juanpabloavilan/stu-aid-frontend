import { StyleSheet, SafeAreaView } from "react-native";

import { StatusBar } from "expo-status-bar";

import NavigationStack from "../navigation/NavigationStack";
import useThemedStyles from "../hooks/useThemedStyles";
import LogoView from "./LogoView";

const Main = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationStack />
    </SafeAreaView>
  );
};

const stylesCallback = (theme) => {
  return StyleSheet.create({
    container: {
      color: theme.themeTokens.textColor,
      flex: 1,
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: theme.themeTokens.backgroundColor,
    },
  });
};

export default Main;
