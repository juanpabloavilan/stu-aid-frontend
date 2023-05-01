import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import useRandomColor from "../../hooks/useRandomColor";
import FrontAnswerBoard from "./FrontAnswerBoard";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.7;

const FrontCard = ({ flashcard, rotate }) => {
  const color = useRandomColor(flashcard.id);
  return (
    <>
      <Pressable onPress={rotate}>
        <StyledView rounded style={[styles.card, { backgroundColor: color }]}>
          <View style={styles.labelContainer}>
            <StyledText h5 bold white>
              Frente
            </StyledText>
            <StyledText h5 bold white>
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
            <StyledText h4 bold white style={{ width: "100%" }}>
              {flashcard.payload.front}
            </StyledText>
          </View>
          <View>
            <StyledText h5 bold white>
              {flashcard.type}
            </StyledText>
          </View>
        </StyledView>
      </Pressable>
      <FrontAnswerBoard flashcard={flashcard} rotate={rotate} />
    </>
  );
};

export default FrontCard;

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
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
