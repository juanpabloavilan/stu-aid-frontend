import { Link } from "react-router-native";
import { StyleSheet } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import LoginForm from "../components/LoginForm";

const LoginView = () => {
  return (
    <StyledView style={styles.container} justifyCenter alignCenter>
      <StyledText h2 bold>
        Log in view
      </StyledText>
      <LoginForm />
      <Link to="/">
        <StyledText h5 secondaryColor underlined>
          Registrarse
        </StyledText>
      </Link>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
});

export default LoginView;
