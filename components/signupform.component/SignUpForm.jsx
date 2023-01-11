import { Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "../formiktextinput.component/FormikTextInput";
import { signUpSchema } from "../../schemas/user.schemas";
import StyledView from "../styled.components/StyledView";

const SignUpForm = () => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log(values);
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
