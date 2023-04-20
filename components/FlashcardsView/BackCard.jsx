import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import ScoreBoard from "./ScoreBoard";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.8;

const BackCard = ({ flashcard, rotate }) => {
  const { type, payload } = flashcard;
  const back = {
    "front-reverse": payload.back,
    "true-false": payload.back.answer === "true" ? "Verdadero" : "Falso",
    elaborated: payload.back.answer,
  };
  return (
    <Pressable onPress={rotate}>
      <StyledView bgSecondary rounded style={styles.card}>
        <View style={styles.labelContainer}>
          <StyledText h5 bold>
            Reverso
          </StyledText>
          <StyledText h5 bold>
            {flashcard?.subject?.name}
          </StyledText>
        </View>

        <View
          style={{
            flexGrow: 1,
            flex: 1,
            flexShrink: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledText h4 bold style={{ width: "100%" }}>
            {back[type]}
          </StyledText>
        </View>
      </StyledView>
    </Pressable>
  );
};

export default BackCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 16,
    alignSelf: "center",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
