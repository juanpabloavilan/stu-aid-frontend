import { useNavigation } from "@react-navigation/native";
import useRandomColor from "../hooks/useRandomColor";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import { StyleSheet, Pressable, View } from "react-native";
import DeleteCourseIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const SubjectItem = ({
  id,
  courseId,
  name,
  status,
  index,
  setSelectedSubject,
  selectedSubject,
}) => {
  const styles = useThemedStyles(stylesCallback);
  const color = useRandomColor(id);
  const navigation = useNavigation();
  const showOptions = index === selectedSubject;

  const onDeleteModal = () => {
    navigation.navigate("DeleteSubjectModal", {
      subjectId: id,
      courseId: courseId,
    });
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Subject", { subjectId: id, courseId: courseId });
      }}
      onLongPress={() => {
        setSelectedSubject(index);
      }}
    >
      <StyledView
        rounded
        bgSecondary
        style={[styles.container, { borderColor: color }]}
      >
        <StyledText h3 bold>
          {name}
        </StyledText>
        <StyledText p>{status}</StyledText>

        {showOptions && (
          <StyledView style={styles.optionsContainer}>
            <Pressable onPress={onDeleteModal}>
              <View style={styles.option}>
                <StyledText>Delete</StyledText>
                <DeleteCourseIcon
                  name="delete"
                  size={36}
                  color={styles.deleteIcon.color}
                />
              </View>
            </Pressable>
          </StyledView>
        )}
      </StyledView>
    </Pressable>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingHorizontal: 24,
      borderLeftWidth: 8,
    },
    optionsContainer: {
      flexDirection: "row",
      position: "absolute",
      right: 8,
      top: 0,
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: theme.themeTokens.backgroundColor,
    },
    option: {
      marginHorizontal: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    deleteIcon: {
      color: theme.themeTokens.colors.red,
    },
  });

export default SubjectItem;
