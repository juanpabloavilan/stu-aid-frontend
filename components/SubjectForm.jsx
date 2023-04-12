import { StyleSheet, Pressable } from "react-native";
import React from "react";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import SwitchInput from "./SwitchInput";
import { Formik } from "formik";
import StyledText from "../styled_components/StyledText";
import FormikTextInput from "./FormikTextInput";
import LoadingSpinner from "./LoadingSpinner";
import { upsertSubject } from "../schemas/subject.schema";

const SubjectForm = ({ initialValues, onSubmit, data, error, loading }) => {
  console.log(initialValues, "SubjectForm");
  const styles = useThemedStyles(stylesCallback);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={upsertSubject}
      validateOnBlur={true}
    >
      {({ handleSubmit }) => (
        <StyledView main>
          <Pressable onPress={(values) => handleSubmit(values)}>
            <StyledView rounded blue style={styles.button}>
              <StyledText bold white>
                Guardar
              </StyledText>
            </StyledView>
          </Pressable>

          {data && (
            <StyledText style={styles.feedbackControls}>Guardado!</StyledText>
          )}
          {error && (
            <StyledText style={styles.feedbackControls}>{error}</StyledText>
          )}
          {loading && <LoadingSpinner style={styles.feedbackControls} />}

          <FormikTextInput
            name="name"
            placeholder="Título"
            textInputStyles={styles.inputStyle}
          />

          <StyledText h5 gray style={styles.flashcardsTextInput}>
            {"Fecha de creación: " +
              new Date(initialValues.createdAt).toLocaleString()}
          </StyledText>

          <StyledText h5 gray style={styles.flashcardsTextInput}>
            {"Fecha de modificación: " +
              new Date(initialValues.updatedAt).toLocaleString()}
          </StyledText>

          <SwitchInput
            name="status"
            placeholder="Estatus"
            trueValue="active"
            trueLabel="activo"
            falseValue="unactive"
            falseLabel="inactivo"
            initialValue={initialValues.status}
          />
        </StyledView>
      )}
    </Formik>
  );
};

export default SubjectForm;

const stylesCallback = (theme) => {
  return StyleSheet.create({
    inputStyle: {
      outlineStyle: "none",
      marginHorizontal: 12,
      marginVertical: 10,
      paddingVertical: 8,
      borderWidth: 0,
      borderRadius: 0,
      borderBottomColor: theme.themeTokens.colors.gray,
      borderBottomWidth: 1,
      color: theme.themeTokens.textColor,
    },
    flashcardsTextInput: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 10,
      outlineStyle: "none",
      flex: 1,
      flexGrow: 1,
    },
    placeholder: {
      color: theme.themeTokens.regularIconColor,
    },

    button: {
      alignSelf: "flex-end",
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    feedbackControls: {
      alignSelf: "flex-end",
    },
  });
};
