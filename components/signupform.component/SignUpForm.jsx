import { Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "../formiktextinput.component/FormikTextInput";
import { signUpSchema } from "../../schemas/user.schemas";
import StyledView from "../styled.components/StyledView";
import useSignUpService from "../../hooks/useSignUpService";
import { useState } from "react";
import StyledText from "../styled.components/StyledText";

const SignUpForm = () => {
  const [rerender, setRerender] = useState(false);
  const { data, error, loading, fetchSignUp } = useSignUpService();

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async ({ fullname, email, password }) => {
    try {
      await fetchSignUp({ fullname, email, password });
      setRerender(!rerender);
      console.log(data, loading, error);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signUpSchema}
    >
      {({ handleSubmit }) => (
        <StyledView style={styles.container}>
          <FormikTextInput name="fullname" placeholder="Nombre completo" />
          <FormikTextInput name="email" placeholder="Correo electrónico" />
          <FormikTextInput
            name="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            secureTextEntry
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Repite la contraseña"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Registrarse" />
          {error && (
            <StyledText error h4>
              {error}
            </StyledText>
          )}
          {loading && <StyledText h4>Loading</StyledText>}
          {data && <StyledText h4>Registro exitoso</StyledText>}
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

export default SignUpForm;
