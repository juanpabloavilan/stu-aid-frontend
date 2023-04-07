import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DoneIcon from "react-native-vector-icons/Ionicons";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import StyledButton from "./StyledButton";
import useThemedStyles from "../hooks/useThemedStyles";

const FlashcardOptions = ({ handleDone, handleDelete }) => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <View style={styles.container}>
      <StyledButton onPress={handleDelete}>
        <DeleteIcon
          name="delete-circle"
          style={styles.deleteButton}
          size={30}
        />
      </StyledButton>

      <StyledButton onPress={handleDone}>
        <DoneIcon name="checkmark-circle" style={styles.doneButton} size={30} />
      </StyledButton>
    </View>
  );
};

export default FlashcardOptions;

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignSelf: "flex-end",
      justifyContent: "space-evenly",
    },
    doneButton: {
      color: theme.themeTokens.colors.green,
    },
    deleteButton: {
      color: theme.themeTokens.colors.red,
    },
  });
