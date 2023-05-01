import { StyleSheet, SafeAreaView, View } from "react-native";
import NavigationStack from "../navigation/NavigationStack";
import useThemedStyles from "../hooks/useThemedStyles";
import Constants from "expo-constants";

const Main = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[{ marginTop: Constants.statusBarHeight }, styles.container]}
      >
        <NavigationStack />
      </View>
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
