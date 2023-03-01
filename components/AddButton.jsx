import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledView from "../styled_components/StyledView";
import AddIcon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StyledText from "../styled_components/StyledText";

const AddButton = ({ style, onPress, text }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <StyledView rounded flexRow style={style}>
        <AddIcon name="ios-add-circle" size={40} color={style.color} />
        <StyledText bold h4 style={{ marginLeft: 8 }}>
          {text}
        </StyledText>
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;
