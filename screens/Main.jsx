import { StyleSheet, SafeAreaView } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import useJwtLogInService from "../hooks/useJwtLogInService";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import NavigationStack from "../navigation/NavigationStack";

const Main = () => {
  const authStorage = useContext(AuthStorageContext);
  const { loading, error, data, jwtSignIn } = useJwtLogInService();
  const { theme } = useContext(ThemeContext);
  const { currentTheme } = theme;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const hasSessionSaved = async () => {
      //await authStorage.removeAccessToken();
      const accessToken = await authStorage.getAccessToken();
      if (accessToken) {
        console.log(accessToken);
        await jwtSignIn(accessToken);
      }
    };
    //navigation.navigate("Login");
    hasSessionSaved();
  }, []);

  useLayoutEffect(() => {
    const setTheme = () => {
      const time = new Date().getHours();
      if (time >= 5 && time <= 18) {
        console.log("Setting light mode");
        theme.setCurrentTheme("light");
      } else {
        console.log("Setting dark mode");
        theme.setCurrentTheme("dark");
      }
    };
    setTheme();
    console.log(currentTheme);
  }, [currentTheme, theme]);

  const styles = useThemedStyles(stylesCallback);
  console.log(styles);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
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
