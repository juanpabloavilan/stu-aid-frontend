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
import SwitchInput from "../../components/SwitchInput";

const TrueFalseQuestion = () => {
  const navigation = useNavigation();

  const {
    params: { initialValues, subjectId, courseId },
  } = useRoute();

  const [initialVals, setInitialVals] = useState(
    initialValues
      ? {
          id: initialValues.id,
          front: initialValues.front,
          answer: initialValues.back.answer,
        }
      : {
          id: null,
          front: "",
          answer: "false",
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
    const { id, front, answer } = data;
    const flashcardPayload = {
      payload: {
        front,
        back: {
          answer,
        },
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
            <StyledText h3 bold blue style={{ marginVertical: 10 }}>
              Pregunta de Verdadero/Falso
            </StyledText>
            <FormikAutoExpandingTextInput
              name="front"
              textInputStyles={styles.textInput}
              initialValue={initialVals.front}
              placeholder="Frente"
              placeholderTextColor={styles.placeholder.color}
            />

            <SwitchInput
              name="answer"
              placeholder="Respuesta"
              trueValue="true"
              trueLabel="Verdadero"
              falseValue="false"
              falseLabel="Falso"
              initialValue={initialVals.answer}
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
