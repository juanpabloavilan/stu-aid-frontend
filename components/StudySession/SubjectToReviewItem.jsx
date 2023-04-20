import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import useRandomColor from "../../hooks/useRandomColor";
import { useNavigation } from "@react-navigation/native";

const SubjectToReviewItem = ({ id, name, status, course, flashcards }) => {
  const color = useRandomColor(id);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Study Session", { subject: id,  })}
    >
      <StyledView
        rounded
        paddingDefault
        style={{ flexGrow: 1, margin: 4, backgroundColor: color }}
      >
        <View style={{ flexGrow: 1, flexDirection: "row" }}>
          <StyledText>📌</StyledText>
          <StyledText bold white h4 style={{ width: "100%" }}>
            {name}
          </StyledText>
        </View>
        <View style={{ padding: 4 }}>
          <StyledText white h5>
            {course.name}
          </StyledText>
          <StyledText white h5>
            {flashcards.length} flashcards.
          </StyledText>
        </View>
      </StyledView>
    </Pressable>
  );
};

export default SubjectToReviewItem;

const styles = StyleSheet.create({});
