import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import SwitchInput from "./SwitchInput";
import { Formik } from "formik";
import StyledText from "../styled_components/StyledText";

const SubjectFlashcardsNotes = ({
  initialValues,
  onSubmit,
  data,
  error,
  loading,
}) => {
  const [flashcards, setFlashcards] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  const styles = useThemedStyles(stylesCallback);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <StyledView main>
          <Pressable onPress={handleSubmit}>
            <StyledView rounded blue style={styles.button}>
              <StyledText bold white>
                Guardar
              </StyledText>
            </StyledView>
          </Pressable>

          <TextInput
            placeholder="Título"
            placeholderTextColor={styles.placeholder.color}
            value={subjectName}
            onChangeText={setSubjectName}
            style={styles.subjectName}
          />

          <SwitchInput
            name="status"
            placeholder="Estatus"
            trueValue="active"
            trueLabel="activo"
            falseValue="unactive"
            falseLabel="inactivo"
          />

          <TextInput
            placeholder="Comienza a escribir aquí"
            placeholderTextColor={styles.placeholder.color}
            multiline={true}
            style={styles.flashcardsTextInput}
            value={flashcards}
            onChangeText={setFlashcards}
            autoFocus={true}
            focusable={true}
            selectionColor="#fff"
          />
        </StyledView>
      )}
    </Formik>
  );
};

export default SubjectFlashcardsNotes;

const stylesCallback = (theme) => {
  return StyleSheet.create({
    subjectName: {
      outlineStyle: "none",
      padding: 8,
    },
    flashcardsTextInput: {
      padding: 8,
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
  });
};
