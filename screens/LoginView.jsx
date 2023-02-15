import { Link } from "react-router-native";
import { StyleSheet } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import LoginForm from "../components/LoginForm";

const LoginView = () => {
  return (
    <StyledView main justifyCenter alignCenter>
      <StyledView
        style={styles.container}
        justifyCenter
        alignCenter
        rounded
        bgSecondary
      >
        <StyledText h2 bold>
          Iniciar sesión
        </StyledText>
        <LoginForm />
        <Link to="/">
          <StyledText h5 secondaryColor underlined>
            Registrarse
          </StyledText>
        </Link>
      </StyledView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 28,
  },
});

export default LoginView;
