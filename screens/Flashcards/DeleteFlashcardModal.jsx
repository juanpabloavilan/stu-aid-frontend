import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import StyledModalScreen from "../../components/StyledModalScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import useDeleteFlashcard from "../../hooks/useDeleteFlashcard";
import LoadingSpinner from "../../components/LoadingSpinner";

const DeleteFlashcardModal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    params: { flashcardId, courseId, subjectId },
  } = route;

  const { loading, data, error, execute } = useDeleteFlashcard(
    flashcardId,
    subjectId,
    courseId
  );

  const onAbortDeleteOperation = () => {
    navigation.goBack();
  };

  const onDeleteOperation = () => {
    execute();
  };

  useEffect(() => {
    if (data) {
      navigation.navigate("Subject", { subjectId, courseId });
    }
  }, [data]);

  const styles = useThemedStyles(stylesCallback);

  return (
    <StyledModalScreen>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledText h3 bold blue>
          Eliminar Flashcard
        </StyledText>

        <StyledText h4>
          Se borrará de manera permanente esta flashcard.
        </StyledText>
        <StyledText h4 bold>
          ¿Estás seguro de continuar?
        </StyledText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
          }}
        >
          <Pressable onPressOut={onDeleteOperation}>
            <StyledView style={styles.button} rounded red>
              <StyledText white bold>
                CONTINUAR
              </StyledText>
            </StyledView>
          </Pressable>

          <Pressable onPressOut={onAbortDeleteOperation}>
            <StyledView style={styles.button} rounded gray>
              <StyledText white bold>
                CANCELAR
              </StyledText>
            </StyledView>
          </Pressable>
        </View>

        {loading && <LoadingSpinner />}
        {error && (
          <StyledText error>
            {error.message || error.response?.message}
          </StyledText>
        )}
      </View>
    </StyledModalScreen>
  );
};

export default DeleteFlashcardModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    button: {
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
