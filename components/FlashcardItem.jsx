import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import StyledText from "../styled_components/StyledText";
import StyledButton from "./StyledButton";
import { useNavigation } from "@react-navigation/native";

const FlashcardItem = ({
  type,
  payload,
  id,
  pos,
  courseId,
  subjectId,
  dispatch,
  select,
  setSelected,
}) => {
  const navigation = useNavigation();
  //   console.log(payload, back[type], type, id);
  const back = {
    "front-reverse": payload.back,
    "true-false": payload.back.answer ? "Verdadero" : "Falso",
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
  return (
    <StyledButton onPress={onEditFlashcard}>
      <StyledText h3 bold>
        {payload.front}
      </StyledText>
      <StyledText>{back[type]}</StyledText>
    </StyledButton>
  );
};

export default FlashcardItem;

const styles = StyleSheet.create({});
