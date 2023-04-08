import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import useThemedStyles from "../../hooks/useThemedStyles";
import { Formik } from "formik";
import { FrontReverseSchema } from "../../schemas/flashcard.schema";
import FormikAutoExpandingTextInput from "../../components/FormikAutoExpandingTextInput";
import StyledButton from "../../components/StyledButton";
import FlashcardOptions from "../../components/FlashcardOptions";
import { Dimensions } from "react-native";
import StyledView from "../../styled_components/StyledView";
import TextEditor from "../../components/TextEditor";
import { FLASHCARD_TYPES } from "../../reducers/flashcard.types";
import StyledModalScreen from "../../components/StyledModalScreen";
import StyledText from "../../styled_components/StyledText";
import { useRoute } from "@react-navigation/native";
import { back } from "react-native/Libraries/Animated/Easing";
/**
 * TODO:
 * 0. Implementar Redux global state.
 * 0.1 Cambiar la vista de temas para que renderice el contenido de las flashcards y no los formularios.
 * 1. Crear los modals de flashcards.
 * 2. Implementar RichTextEditor
 * 3. Editar formularios enviar cambios a la api
 *
 */
const FrontReverseQuestion = () => {
  const { params: initialValues } = useRoute();
  const initialVals = initialValues
    ? initialValues
    : {
        id: null,
        pos: null,
        payload: {
          front: "",
          back: "",
        },
      };

  const styles = useThemedStyles(stylesCallback);

  const onSubmit = (data) => {
    console.log(data);
    const { id, pos, front, back } = data;
    dispatch({
      type: FLASHCARD_TYPES.editFlashcard,
      payload: {
        id,
        pos,
        front,
        back,
      },
    });
  };

  const onDelete = () => {
    console.log(data);
    dispatch({
      type: FLASHCARD_TYPES.removeFlashcard,
      payload: {
        id,
        pos,
      },
    });
  };

  return (
    <StyledModalScreen>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={FrontReverseSchema}
      >
        {({ handleSubmit }) => (
          <View style={{ backgroundColor: "cyan" }}>
            <FormikAutoExpandingTextInput
              name="front"
              textInputStyles={styles.textInput}
              initialValue={initialVals.front}
              placeholder="Front"
              placeholderTextColor={styles.placeholder.color}
            />

            <FormikAutoExpandingTextInput
              name="back"
              textInputStyles={styles.textInput}
              initialValue={initialVals.back}
              placeholder="Back"
              placeholderTextColor={styles.placeholder.color}
            />

            <FlashcardOptions
              handleDone={handleSubmit}
              handleDelete={onDelete}
            />
          </View>
        )}
      </Formik>
    </StyledModalScreen>
  );
};

export default FrontReverseQuestion;

const stylesCallback = (theme) =>
  StyleSheet.create({
    textInput: {
      borderWidth: 0,
      color: theme.themeTokens.textColor,
      outlineStyle: "none",
      marginHorizontal: 12,
      marginVertical: 10,
      borderWidth: 0,
      borderRadius: 0,
    },
    placeholder: {
      color: theme.themeTokens.regularIconColor,
    },
  });
