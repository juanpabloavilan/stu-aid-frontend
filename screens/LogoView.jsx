import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";

const LogoView = () => {
  return (
    <StyledView main paddingDefault alignCenter justifyCenter>
      <StyledText blue bold h1>
        {" "}
        Stu-aid{" "}
      </StyledText>
    </StyledView>
  );
};

export default LogoView;

const styles = StyleSheet.create({});
