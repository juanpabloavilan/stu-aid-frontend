import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import useThemedStyles from "../../hooks/useThemedStyles";
import { Formik } from "formik";
import { TrueFalseSchema } from "../../schemas/flashcard.schema";
import FormikAutoExpandingTextInput from "../../components/FormikAutoExpandingTextInput";
import FlashcardOptions from "../../components/FlashcardOptions";
import StyledModalScreen from "../../components/StyledModalScreen";
import StyledText from "../../styled_components/StyledText";
import { useNavigation, useRoute } from "@react-navigation/native";
import usePostFlashcards from "../../hooks/usePostFlashcards";
import { useEffect } from "react";

const TrueFalseQuestion = () => {
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
      type: "true-false",
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
        validationSchema={TrueFalseSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <StyledText h3 bold blue>
              Pregunta de Verdadero/Falso
            </StyledText>
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

export default TrueFalseQuestion;

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
