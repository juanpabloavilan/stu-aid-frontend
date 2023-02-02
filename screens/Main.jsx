import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { Routes, Route } from "react-router-native";

import SignUpView from "./SignUpView";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import LoginView from "./LoginView";
import MyCoursesView from "./MyCoursesView";
const Main = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <SafeAreaView style={styles.container}>
      <Routes>
        <Route path="/" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/courses" element={<MyCoursesView />} />
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
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export default Main;
