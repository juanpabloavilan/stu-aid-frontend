import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import SignUpForm from "../components/SignUpForm";
import { Button, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { Link } from "react-router-native";

const SignUpView = () => {
  const navigation = useNavigation();
  return (
    <StyledView main paddingDefault justifyCenter alignCenter>
      <StyledView
        rounded
        alignCenter
        bgSecondary
        style={{
          width: "80%",
          paddingVertical: 28,
        }}
      >
        <StyledText h1 bold>
          Registrate para comenzar a usar la app
        </StyledText>
        <SignUpForm />
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
          <View>
            <StyledText h5 secondaryColor underlined>
              Iniciar sesión
            </StyledText>
          </View>
        </TouchableWithoutFeedback>
      </StyledView>
    </StyledView>
  );
};

export default SignUpView;
