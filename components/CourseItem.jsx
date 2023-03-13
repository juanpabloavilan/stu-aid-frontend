import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import CourseIcon from "react-native-vector-icons/MaterialIcons";
import useRandomColor from "../hooks/useRandomColor";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import EditCourseIcon from "react-native-vector-icons/FontAwesome";
import DeleteCourseIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EditCourseModal from "../screens/EditCourseModal";

const CourseItem = ({ id, name, status, description, priority }) => {
  const styles = useThemedStyles(styleSheetsCallback);
  const randomColor = useRandomColor(id);
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);

  const onEditModal = () => {
    navigation.navigate("EditCourseModal", { id });
    setShowOptions(false);
  };

  const onDeleteModal = () => {
    navigation.navigate("DeleteCourseModal", { id });
    setShowOptions(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("CourseView", { id });
      }}
      onLongPress={() => {
        setShowOptions(true);
      }}
    >
      <View>
        <StyledView rounded style={styles.container}>
          <View>
            <CourseIcon name="class" size={30} color={randomColor} />
          </View>
          <View style={{ flexShrink: 1, alignItems: "center" }}>
            <StyledText h5>{name.toUpperCase()}</StyledText>
          </View>
        </StyledView>

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

            <Pressable onPress={onEditModal}>
              <View style={styles.option}>
                <StyledText>Edit</StyledText>
                <EditCourseIcon
                  name="edit"
                  size={34}
                  color={styles.editIcon.color}
                />
              </View>
            </Pressable>
          </StyledView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styleSheetsCallback = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      paddingVertical: 8,
      paddingHorizontal: 16,
      gap: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    optionsContainer: {
      flexDirection: "row",
      position: "absolute",
      right: 8,
      top: 8,
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
    editIcon: {
      color: theme.themeTokens.colors.yellow,
    },
  });

export default CourseItem;
