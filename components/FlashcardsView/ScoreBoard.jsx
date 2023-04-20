import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledButton from "../StyledButton";
import StyledText from "../../styled_components/StyledText";
import usePostFlashcards from "../../hooks/usePostFlashcards";

const ScoreBoard = ({ nextCard, flashcard, index }) => {
  //const {} = usePostFlashcards()

  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "white",
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
          onPress={() => {
            console.log("Calificación 1");
            nextCard(index);
            console.log(
              "🚀 ~ file: ScoreBoard.jsx:33 ~ ScoreBoard ~ nextCard:",
              index
            );
          }}
        >
          <StyledText h4 white>
            1
          </StyledText>
        </StyledButton>

        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => console.log("Calificación 2")}
        >
          <StyledText h4 secondaryColor>
            2
          </StyledText>
        </StyledButton>
        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => console.log("Calificación 3")}
        >
          <StyledText h4 secondaryColor>
            3
          </StyledText>
        </StyledButton>
        <StyledButton
          style={styles.buttonOption}
          lightGray
          rounded
          onPress={() => console.log("Calificación 4")}
        >
          <StyledText h4 secondaryColor>
            4
          </StyledText>
        </StyledButton>
        <StyledButton
          green
          style={styles.buttonOption}
          rounded
          onPress={() => console.log("Calificación 5")}
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

export default ScoreBoard;

const styles = StyleSheet.create({
  buttonOption: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
});
