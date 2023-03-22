import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import AutoExpandingTextInput from "./AutoExpandingTextInput";
import useThemedStyles from "../hooks/useThemedStyles";
import DoneIcon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import { FrontReverseSchema } from "../schemas/flashcard.schema";
import FormikAutoExpandingTextInput from "./FormikAutoExpandingTextInput";

const FrontReverseQuestion = ({ setFlashcards, ...data }) => {
  const { front, back } = data.payload;
  const styles = useThemedStyles(stylesCallback);
  const [isFocused, setIsFocused] = useState(false);

  const onBlurValidation = () => {
    console.log("Form is blurring");
  };

  return (
    <Formik
      validateOnBlur={true}
      initialValues={data}
      validationSchema={FrontReverseSchema}
    >
      {({ handleBlur }) => {
        return (
          <View>
            <FormikAutoExpandingTextInput
              name="front"
              textInputStyles={styles.textInput}
              initialValue={front}
              placeholder="Front"
              placeholderTextColor={styles.placeholder.color}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <FormikAutoExpandingTextInput
              name="back"
              textInputStyles={styles.textInput}
              initialValue={back}
              placeholder="Back"
              placeholderTextColor={styles.placeholder.color}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
              <DoneIcon
                name="checkmark-circle"
                style={styles.button}
                size={40}
              />
            )}
          </View>
        );
      }}
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
    button: {
      color: theme.themeTokens.colors.green,
      alignSelf: "flex-end",
    },
  });
