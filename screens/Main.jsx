import { StyleSheet, SafeAreaView } from "react-native";
import { Routes, Route } from "react-router-native";
import SignUpView from "./SignUpView";
import useThemedStyles from "../hooks/useThemedStyles";
import LoginView from "./LoginView";
import HomeView from "./HomeView";
import MyCoursesView from "./MyCoursesView";
import QuickFlashcardsView from "./QuickFlashcardsView";
import CourseView from "./CourseView";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import useJwtLogInService from "../hooks/useJwtLogInService";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../contexts/ThemeContext";
import StyledView from "../styled_components/StyledView";

const Main = () => {
  const authStorage = useContext(AuthStorageContext);
  const { loading, error, data, jwtSignIn } = useJwtLogInService();
  const { theme } = useContext(ThemeContext);
  const { currentTheme } = theme;

  useLayoutEffect(() => {
    const hasSessionSaved = async () => {
      const accessToken = await authStorage.getAccessToken();
      if (accessToken) {
        console.log(accessToken);
        await jwtSignIn(accessToken);
      }
    };
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
      <StyledView main bgDefault>
        <Routes>
          <Route path="/" element={<SignUpView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={<HomeView />}>
            <Route path="courses" element={<MyCoursesView />} />
            <Route path="quick-flashcards" element={<QuickFlashcardsView />} />
            <Route path="courses/:courseId" element={<CourseView />} />
          </Route>
        </Routes>
      </StyledView>
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
