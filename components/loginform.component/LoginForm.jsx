import { Formik } from "formik";
import { Button, StyleSheet } from "react-native";
import { loginSchema } from "../../schemas/user.schemas";
import StyledView from "../styled.components/StyledView";
import FormikTextInput from "../formiktextinput.component/FormikTextInput";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmitLogin = (values) => console.log(values);
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
