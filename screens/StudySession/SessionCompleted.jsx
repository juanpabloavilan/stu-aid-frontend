import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import StyledButton from "../../components/StyledButton";
import { useNavigation } from "@react-navigation/native";

const SessionCompleted = () => {
  const navigation = useNavigation();
  return (
    <StyledView main green alignCenter justifyCenter>
      <StyledText bold h2 white>
        ¡Felicitaciones!
      </StyledText>
      <StyledText white>Sesión de estudio completada! 🎉🎉</StyledText>
      <StyledButton
        gray
        rounded
        style={{ padding: 12, marginTop: 12 }}
        onPress={() => navigation.navigate("Home")}
      >
        <StyledText white bold>
          Volver al inicio
        </StyledText>
      </StyledButton>
    </StyledView>
  );
};

export default SessionCompleted;

const styles = StyleSheet.create({});
