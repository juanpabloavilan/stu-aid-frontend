import { StyleSheet, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import SwitchInput from "./SwitchInput";
import { Formik } from "formik";
import StyledText from "../styled_components/StyledText";
import FlashcardList from "./FlashcardList";
import FormikTextInput from "./FormikTextInput";

const SubjectFlashcardsNotes = ({
  initialValues,
  onSubmit,
  data,
  error,
  loading,
}) => {
  return (
    <FlashcardList
      initialValues={initialValues}
      onSubmit={onSubmit}
      data={data}
      error={error}
      loading={loading}
    />
  );
};

export default SubjectFlashcardsNotes;

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
  });
};
