import { ActivityIndicator } from "react-native";
import React from "react";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";

const LoadingSpinner = () => {
  return (
    <StyledView main justifyCenter alignCenter>
      <ActivityIndicator size="large" />
      <StyledText>Cargando</StyledText>
    </StyledView>
  );
};

export default LoadingSpinner;
