import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import StyledText from "../styled_components/StyledText";
import StyledButton from "./StyledButton";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";

const FlashcardItem = ({ type, payload, id, pos, courseId, subjectId }) => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);
  const back = {
    "front-reverse": payload.back,
    "true-false": payload.back.answer === "true" ? "Verdadero" : "Falso",
    elaborated: payload.back.answer,
  };

  const onEditFlashcard = () => {
    const routes = {
      elaborated: "ElaboratedQuestionModal",
      "front-reverse": "FrontReverseQuestionModal",
      "true-false": "TrueFalseQuestionModal",
    };

    navigation.navigate(routes[type], {
      initialValues: {
        front: payload.front,
        back: payload.back,
        id,
        pos,
        subjectId,
      },
      courseId,
      subjectId,
    });
  };

  const color = {
    elaborated: "gray",
    "front-reverse": "green",
    "true-false": "blue",
  };
  return (
    <StyledButton onPress={onEditFlashcard}>
      <View style={[styles[color[type]], { paddingLeft: 10 }]}>
        <StyledText h3 bold>
          {payload.front}
        </StyledText>
        <StyledText h5>{back[type]}</StyledText>
      </View>
    </StyledButton>
  );
};

export default FlashcardItem;

const stylesCallback = (theme) =>
  StyleSheet.create({
    green: {
      borderLeftColor: theme.themeTokens.colors.green,
      borderLeftWidth: 4,
    },
    gray: {
      borderLeftColor: theme.themeTokens.colors.gray,
      borderLeftWidth: 4,
    },
    blue: {
      borderLeftColor: theme.themeTokens.colors.blue,
      borderLeftWidth: 4,
    },
  });
