import { StyleSheet, SafeAreaView } from "react-native";
import { Routes, Route } from "react-router-native";
import SignUpView from "./SignUpView";
import useThemedStyles from "../hooks/useThemedStyles";
import LoginView from "./LoginView";
import HomeView from "./HomeView";
import MyCoursesView from "./MyCoursesView";
import QuickFlashcardsView from "./QuickFlashcardsView";
import CourseView from "./CourseView";
import CourseDetailsView from "./CourseDetailsView ";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import axios from "axios";
import useJwtLogInService from "../hooks/useJwtLogInService";

const Main = () => {
  const authStorage = useContext(AuthStorageContext);
  const styles = useThemedStyles(stylesCallback);
  const navigate = useNavigate();
  const { loading, error, data, jwtSignIn } = useJwtLogInService();

  useLayoutEffect(() => {
    console.log("layout effect");
  }, []);

  useEffect(() => {
    const hasSessionSaved = async () => {
      const accessToken = await authStorage.getAccessToken();
      console.log(accessToken);
      if (accessToken) {
        console.log(accessToken);
        await jwtSignIn(accessToken);
        console.log(data, error, loading);
      }
    };
    hasSessionSaved();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Routes>
        <Route path="/" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/home" element={<HomeView />}>
          <Route index element={<MyCoursesView />} />
          <Route path="quick-flashcards" element={<QuickFlashcardsView />} />
        </Route>
        <Route path="/courses" element={<CourseView />}>
          <Route path=":courseId" element={<CourseDetailsView />} />
        </Route>
      </Routes>
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
