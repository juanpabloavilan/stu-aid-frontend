import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import StyledView from "../styled_components/StyledView";
import FormikTextInput from "./FormikTextInput";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import SwitchInput from "./SwitchInput";
import DropdownInput from "./DropdownInput";

const PrioridadEnum = [
  { label: "Baja 1", value: 1 },
  { label: "Baja-media 2", value: 2 },
  { label: "Media 3", value: 3 },
  { label: "Media-alta 4", value: 4 },
  { label: "Alta 5", value: 5 },
];

const CourseForm = ({
  initialValues,
  onSubmitForm,
  validationSchema,
  loading,
  data,
  error,
}) => {
  const styles = useThemedStyles(stylesCallback);

  const onSubmitCourse = async ({ name, status, priority, description }) => {
    console.log(name, status, description, description);
    await onSubmitForm({ name, status, priority, description });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitCourse}
    >
      {({ handleSubmit }) => (
        <>
          <StyledView style={{ flexShrink: 1 }}>
            <FormikTextInput name="name" placeholder="Nombre del curso" />
            <FormikTextInput name="description" placeholder="Descripción" />
            <FormikTextInput name="priority" placeholder="Prioridad" />
            <SwitchInput
              placeholder="Estatus"
              initialValue={initialValues?.status}
              name="status"
              trueValue="active"
              falseValue="dismissed"
              trueLabel="activado"
              falseLabel="desactivado"
            />

            {/* <DropdownInput
              name="priority"
              placeholder="Prioridad"
              items={PrioridadEnum}
              initialValue={1}
            /> */}
            <Pressable style={styles.button} onPress={handleSubmit}>
              <StyledText h5 bold>
                ENVIAR
              </StyledText>
            </Pressable>
          </StyledView>
          <StyledView>
            {data && (
              <StyledText h2 bold>
                Hecho!! 🎉🎉
              </StyledText>
            )}
          </StyledView>
          {loading && (
            <StyledView main paddingDefault justifyCenter alignCenter>
              <ActivityIndicator size="large" />
              <StyledText>Cargando</StyledText>
            </StyledView>
          )}
          {error && (
            <StyledView justifyCenter alignCenter>
              <StyledText h4 error>
                {error.response?.data?.message || error.message}
              </StyledText>
            </StyledView>
          )}
        </>
      )}
    </Formik>
  );
};

export default CourseForm;

const stylesCallback = (theme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 8,
      backgroundColor: theme.themeTokens.colors.green,
      marginTop: 16,
    },
  });
