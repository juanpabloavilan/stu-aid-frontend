import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import StyledButton from "../StyledButton";
import StyledText from "../../styled_components/StyledText";
import { Formik } from "formik";
import useThemedStyles from "../../hooks/useThemedStyles";
import FormikAutoExpandingTextInput from "../FormikAutoExpandingTextInput";
import ArrowRightIcon from "react-native-vector-icons/AntDesign";

const FrontAnswerBoard = ({ rotate, flashcard, index }) => {
  const styles = useThemedStyles(stylesCallback);
  const { type } = flashcard;
  if (type === "true-false") {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          justifyContent: "space-evenly",
        }}
      >
        <StyledButton rounded red onPress={rotate} style={styles.button}>
          <StyledText bold white>
            Falso
          </StyledText>
        </StyledButton>
        <StyledButton rounded green onPress={rotate} style={styles.button}>
          <StyledText bold white>
            Verdadero
          </StyledText>
        </StyledButton>
      </View>
    );
  }
  if (type === "front-reverse") {
    return null;
  }
  if (type === "elaborated") {
    const onSubmit = () => {
      rotate();
    };
    return (
      <Formik onSubmit={onSubmit} initialValues={{ answer: "" }}>
        {({ handleSubmit }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <FormikAutoExpandingTextInput
              name="answer"
              textInputStyles={styles.textInput}
              initialValue=""
              placeholder="Respuesta"
              placeholderTextColor={styles.placeholder.color}
            />
            <Pressable onPress={handleSubmit}>
              <ArrowRightIcon
                name="arrowright"
                size={30}
                color={styles.placeholder.color}
              />
            </Pressable>
          </View>
        )}
      </Formik>
    );
  }
};

export default FrontAnswerBoard;

const stylesCallback = (theme) =>
  StyleSheet.create({
    textInput: {
      flexGrow: 1,
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
    button: {
      width: 100,
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
