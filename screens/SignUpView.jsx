import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-native";
const SignUpView = () => {
  return (
    <StyledView
      rounded
      style={{ width: "80%", paddingVertical: 15, alignItems: "center" }}
    >
      <StyledText h1 bold>
        Registrate para comenzar a usar la app
      </StyledText>
      <SignUpForm />
      <Link to="/login">
        <StyledText h5 secondaryColor underlined>
          Iniciar sesión
        </StyledText>
      </Link>
    </StyledView>
  );
};

export default SignUpView;