import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import StyledText from "../styled_components/StyledText";

const FlashcardItem = ({
  type,
  payload,
  id,
  pos,
  dispatch,
  select,
  setSelected,
}) => {
  //   console.log(payload, back[type], type, id);
  const back = {
    "front-reverse": payload.back,
    "true-false": payload.back.answer ? "Verdadero" : "Falso",
    elaborated: payload.back.answer,
  };
  return (
    <View>
      <StyledText h3 bold>
        {payload.front}
      </StyledText>
      <StyledText>{back[type]}</StyledText>
    </View>
  );
};

export default FlashcardItem;

const styles = StyleSheet.create({});
