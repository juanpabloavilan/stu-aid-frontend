import { Formik } from "formik";
import { Button, StyleSheet } from "react-native";
import { loginSchema } from "../schemas/user.schemas";
import StyledView from "../styled_components/StyledView";
import FormikTextInput from "./FormikTextInput";
import StyledText from "../styled_components/StyledText";
import useLogInService from "../hooks/useLogInService";
import { useNavigate } from "react-router-native";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const { data, error, loading, fetchSignIn } = useLogInService();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmitLogin = async ({ email, password }) => {
    await fetchSignIn({ email, password });
  };

  const redirectToMyCourses = () => {
    navigate("/courses");
  };

  useEffect(() => {
    if (isAuthorized) {
      redirectToMyCourses();
    }
  }, [isAuthorized]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitLogin}
      validationSchema={loginSchema}
    >
      {({ handleSubmit }) => (
        <StyledView style={styles.container}>
          <FormikTextInput name="email" placeholder="Correo eléctronico" />
          <FormikTextInput
            name="password"
            placeholder="Contraseña"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Enviar" />
          {error && (
            <StyledText error h4>
              {error}
            </StyledText>
          )}
          {loading && <StyledText h4>Loading</StyledText>}
          {data && (
              <StyledText h4>Login exitoso {JSON.stringify(data)}</StyledText>
            ) &&
            setTimeout(() => setIsAuthorized(true), 0)}
        </StyledView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
  },
});

export default LoginForm;
