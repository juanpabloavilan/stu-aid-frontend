import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import useThemedStyles from "../../hooks/useThemedStyles";
import { Formik } from "formik";
import { FrontReverseSchema } from "../../schemas/flashcard.schema";
import FormikAutoExpandingTextInput from "../../components/FormikAutoExpandingTextInput";
import FlashcardOptions from "../../components/FlashcardOptions";
import StyledModalScreen from "../../components/StyledModalScreen";
import StyledText from "../../styled_components/StyledText";
import { useNavigation, useRoute } from "@react-navigation/native";
import usePostFlashcards from "../../hooks/usePostFlashcards";
import { useEffect } from "react";
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
  const navigation = useNavigation();

  const {
    params: { initialValues, subjectId, courseId },
  } = useRoute();

  const [initialVals, setInitialVals] = useState(
    initialValues
      ? initialValues
      : {
          subjectId,
          id: null,
          pos: null,
          payload: {
            front: "",
            back: "",
          },
        }
  );

  const { data, loading, error, execute } = usePostFlashcards(
    courseId,
    subjectId
  );

  console.log(initialVals);
  useEffect(() => {
    if (data && !error) {
      navigation.goBack();
    }
  }, [data, error]);

  const styles = useThemedStyles(stylesCallback);

  const onSubmit = (data) => {
    console.log(data);
    const { id, front, back } = data;
    const flashcardPayload = {
      payload: {
        front,
        back,
      },
      subjectId,
      type: "front-reverse",
    };

    if (id) {
      flashcardPayload.id = id;
    }

    execute(flashcardPayload);
  };

  const onDelete = () => {
    if (!initialVals.id) return;
    navigation.navigate("DeleteFlashcardModal", {
      flashcardId: initialVals.id,
      subjectId,
      courseId,
    });
  };

  return (
    <StyledModalScreen>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialVals}
        validationSchema={FrontReverseSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <StyledText h3 bold blue style={{ marginVertical: 10 }}>
              Pregunta de Frente/Reverso
            </StyledText>

            <FormikAutoExpandingTextInput
              name="front"
              textInputStyles={styles.textInput}
              initialValue={initialVals.front}
              placeholder="Frente"
              placeholderTextColor={styles.placeholder.color}
            />

            <FormikAutoExpandingTextInput
              name="back"
              textInputStyles={styles.textInput}
              initialValue={initialVals.back}
              placeholder="Reverso"
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
      marginTop: 10,
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
