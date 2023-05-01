import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledButton from "../StyledButton";
import StyledText from "../../styled_components/StyledText";
import useAnswerFlashcard from "../../hooks/useAnswerFlashcard";
import { useEffect } from "react";

const BackAnswerBoard = ({ nextCard, flashcard, index }) => {
  const courseId = flashcard?.subject?.courseId;
  const subjectId = flashcard?.subjectId;
  const flashcardId = flashcard?.id;
  const { loading, data, error, execute } = useAnswerFlashcard(
    courseId,
    subjectId,
    flashcardId
  );

  useEffect(() => {
    if (data) {
      nextCard(index);
      console.log(
        "🚀 ~ file: ScoreBoard.jsx:33 ~ ScoreBoard ~ nextCard:",
        index
      );
    }
  }, [data]);

  const sendScore = async (value) => {
    await execute({ score: value });
    console.log("Calificación", value);
  };

  console.log(flashcard, index);
  return (
    <View
      style={{
        alignSelf: "center",
        borderRadius: 16,
        padding: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledButton
          red
          rounded
          style={styles.buttonOption}
          onPress={() => sendScore(1)}
        >
          <StyledText h4 white>
            1
          </StyledText>
        </StyledButton>

        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => sendScore(2)}
        >
          <StyledText h4 secondaryColor>
            2
          </StyledText>
        </StyledButton>
        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => sendScore(3)}
        >
          <StyledText h4 secondaryColor>
            3
          </StyledText>
        </StyledButton>
        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => sendScore(4)}
        >
          <StyledText h4 secondaryColor>
            4
          </StyledText>
        </StyledButton>
        <StyledButton
          green
          style={styles.buttonOption}
          rounded
          onPress={() => sendScore(5)}
        >
          <StyledText h4 white>
            5
          </StyledText>
        </StyledButton>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StyledText>Muy difícil!</StyledText>
        <StyledText>Muy fácil!</StyledText>
      </View>
    </View>
  );
};

export default BackAnswerBoard;

const styles = StyleSheet.create({
  buttonOption: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
});
