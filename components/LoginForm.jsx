import { Formik } from "formik";
import { Button, StyleSheet, View, Text } from "react-native";
import { loginSchema } from "../schemas/user.schemas";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import FormikTextInput from "./FormikTextInput";
import useLogInService from "../hooks/useLogInService";
import LoadingSpinner from "./LoadingSpinner";

const LoginForm = () => {
  const { data, error, loading, fetchSignIn } = useLogInService();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmitLogin = async ({ email, password }) => {
    await fetchSignIn({ email, password });
  };

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
          <View>
            {error && (
              <StyledText error h4>
                {error}
              </StyledText>
            )}
            {loading && <LoadingSpinner />}
            {data && <StyledText h4>Login exitoso</StyledText>}
          </View>
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
