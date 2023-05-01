import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import StyledModalScreen from "../../components/StyledModalScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import LoadingSpinner from "../../components/LoadingSpinner";
import useDeleteSubject from "../../hooks/useDeleteSubject";
import { Formik } from "formik";
import { TIMER_SCHEMA } from "../../schemas/timer.schema";
import FormikTextInput from "../../components/FormikTextInput";

const TimerModal = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const onAbortStudySession = () => {
    navigation.goBack();
  };

  const onStudySessionWithTimer = ({ minutes }) => {
    navigation.navigate("Study Session", { timer: minutes * 60 });
  };

  const onStudySessionWithoutTimer = () => {
    navigation.navigate("Study Session");
  };

  const styles = useThemedStyles(stylesCallback);

  return (
    <Formik
      validationSchema={TIMER_SCHEMA}
      initialValues={{ minutes: 60 }}
      onSubmit={onStudySessionWithTimer}
    >
      {({ handleSubmit }) => (
        <StyledModalScreen>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledText h3 bold blue>
              Empezar sesión de estudio del día.
            </StyledText>

            <StyledText h4>Cuantos minutos quieres estudiar?</StyledText>
            <FormikTextInput name="minutes" keyboardType="numeric" />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <Pressable onPressOut={handleSubmit}>
                <StyledView style={styles.button} rounded green>
                  <StyledText white bold>
                    Estudiar
                  </StyledText>
                </StyledView>
              </Pressable>

              <Pressable onPressOut={onStudySessionWithoutTimer}>
                <StyledView style={styles.button} rounded gray>
                  <StyledText white bold>
                    Estudiar sin timer
                  </StyledText>
                </StyledView>
              </Pressable>

              <Pressable onPressOut={onAbortStudySession}>
                <StyledView style={styles.button} rounded red>
                  <StyledText white bold>
                    Cancelar
                  </StyledText>
                </StyledView>
              </Pressable>
            </View>
          </View>
        </StyledModalScreen>
      )}
    </Formik>
  );
};

export default TimerModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    button: {
      marginVertical: 16,
      marginHorizontal: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
