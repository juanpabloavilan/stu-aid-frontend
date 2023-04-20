import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import StyledModalScreen from "../../components/StyledModalScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import LoadingSpinner from "../../components/LoadingSpinner";
import useDeleteSubject from "../../hooks/useDeleteSubject";

const DeleteSubjectModal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    params: { subjectId, courseId },
  } = route;

  console.log(subjectId, courseId);

  const { loading, data, error, execute } = useDeleteSubject(
    subjectId,
    courseId
  );

  useEffect(() => {
    if (data) {
      navigation.goBack();
    }
  }, [data]);

  const onAbortDeleteOperation = () => {
    navigation.goBack();
  };

  const onDeleteOperation = () => {
    execute();
  };

  useEffect(() => {
    if (data) {
      navigation.navigate("CourseView", { id: courseId });
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
          Eliminar tema de estudio.
        </StyledText>

        <StyledText h4>
          Se borrarán todas las flashcards que hayas creado.
        </StyledText>
        <StyledText h4 bold>
          ¿Estás seguro de eliminar este tema?
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

export default DeleteSubjectModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    button: {
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
