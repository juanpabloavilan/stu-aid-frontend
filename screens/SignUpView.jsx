import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-native";

const SignUpView = () => {
  return (
    <StyledView main justifyCenter alignCenter>
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
        <Link to="/login">
          <StyledText h5 secondaryColor underlined>
            Iniciar sesión
          </StyledText>
        </Link>
      </StyledView>
    </StyledView>
  );
};

export default SignUpView;
