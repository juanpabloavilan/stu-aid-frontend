import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import useThemedStyles from "../hooks/useThemedStyles";
import { Formik } from "formik";
import { FrontReverseSchema } from "../schemas/flashcard.schema";
import FormikAutoExpandingTextInput from "./FormikAutoExpandingTextInput";
import StyledButton from "./StyledButton";
import FlashcardOptions from "./FlashcardOptions";
import { Dimensions } from "react-native";
import StyledView from "../styled_components/StyledView";
import { FLASHCARD_ACTIONS } from "../reducers/flashcards.reducer";
import TextEditor from "./TextEditor";

/**
 * TODO:
 * 0. Implementar Redux global state.
 * 1. Crear los modals de flashcards.
 * 2. Implementar RichTextEditor
 * 3. Editar formularios enviar cambios a la api
 *
 */
const FrontReverseQuestion = ({ dispatch, selected, setSelected, ...data }) => {
  const { front, back } = data.payload;
  const { id, pos } = data;
  const styles = useThemedStyles(stylesCallback);

  //console.log(data);

  const onSubmit = (data) => {
    console.log(data);
    const { id, pos, front, back } = data;
    dispatch({
      type: FLASHCARD_ACTIONS.editFlashcard,
      payload: {
        id,
        pos,
        front,
        back,
      },
    });
    setSelected(-1);
  };

  const onDelete = () => {
    console.log(data);
    dispatch({
      type: FLASHCARD_ACTIONS.removeFlashcard,
      payload: {
        id,
        pos,
      },
    });
    setSelected(-1);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ id: data.id, pos: data.pos, ...data.payload }}
      validationSchema={FrontReverseSchema}
    >
      {({ handleSubmit }) => (
        <StyledView>
          <FormikAutoExpandingTextInput
            name="front"
            textInputStyles={styles.textInput}
            initialValue={front}
            placeholder="Front"
            placeholderTextColor={styles.placeholder.color}
            onFocus={() => setSelected(id)}
          />

          <FormikAutoExpandingTextInput
            name="back"
            textInputStyles={styles.textInput}
            initialValue={back}
            placeholder="Back"
            placeholderTextColor={styles.placeholder.color}
            onFocus={() => setSelected(id)}
          />

          {selected && (
            <FlashcardOptions
              handleDone={handleSubmit}
              handleDelete={onDelete}
            />
          )}
          {!selected && <View style={{ height: 30 }}></View>}
          {/* <TextEditor /> */}
        </StyledView>
      )}
    </Formik>
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
