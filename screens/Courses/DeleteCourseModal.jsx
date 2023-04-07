import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import StyledModalScreen from "../../components/StyledModalScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import useDeleteCourse from "../../hooks/useDeleteCourse";
import LoadingSpinner from "../../components/LoadingSpinner";

const DeleteCourseModal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    params: { id },
  } = route;

  const { loading, data, error, execute } = useDeleteCourse(id);

  const onAbortDeleteOperation = () => {
    navigation.goBack();
  };

  const onDeleteOperation = () => {
    execute();
  };

  useEffect(() => {
    if (data) {
      navigation.goBack();
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
          Eliminar curso
        </StyledText>

        <StyledText h4>
          Se borrarán todos los temas y las flashcards que hayas creado.
        </StyledText>
        <StyledText h4 bold>
          ¿Estás seguro de eliminar este curso?
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

export default DeleteCourseModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    button: {
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
