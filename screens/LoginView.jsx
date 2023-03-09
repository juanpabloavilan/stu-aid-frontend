// import { Link } from "react-router-native";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import LoginForm from "../components/LoginForm";
import { useNavigation } from "@react-navigation/native";

const LoginView = () => {
  const navigation = useNavigation();
  return (
    <StyledView main paddingDefault justifyCenter alignCenter>
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
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
          <View>
            <StyledText h5 secondaryColor underlined>
              Registrarse
            </StyledText>
          </View>
        </TouchableWithoutFeedback>
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
