import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Routes, Route } from "react-router-native";

import SignUpView from "../signupview.component/SignUpView";
import useThemedStyles from "../../hooks/useThemedStyles";
import StyledText from "../styled.components/StyledText";
import StyledView from "../styled.components/StyledView";
import LoginView from "../login.component/LoginView";

const Main = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <StyledView style={styles.container}>
      <StyledText h1 bold style={styles.title}>
        Stu-aid Main
      </StyledText>
      <Routes>
        <Route path="/" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </StyledView>
  );
};

const stylesCallback = (theme) => {
  return StyleSheet.create({
    title: {
      position: "absolute",
      top: 0,
    },
    container: {
      color: theme.themeTokens.textColor,
      marginTop: Constants.statusBarHeight,
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
