import { Formik } from "formik";
import { Button, StyleSheet, View, Text } from "react-native";
import { loginSchema } from "../schemas/user.schemas";
import StyledView from "../styled_components/StyledView";
import FormikTextInput from "./FormikTextInput";
import StyledText from "../styled_components/StyledText";
import useLogInService from "../hooks/useLogInService";
import { useNavigate } from "react-router-native";
import { useState } from "react";

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
              <Text error h4>
                {error}
              </Text>
            )}
            {loading && <Text>Loading</Text>}
            {data && <Text h4>Login exitoso {JSON.stringify(data)}</Text>}
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
