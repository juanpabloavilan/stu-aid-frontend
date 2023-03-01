import { View, StyleSheet, TouchableHighlight } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import StartSessionIcon from "react-native-vector-icons/FontAwesome5";
import useRandomColor from "../hooks/useRandomColor";
import EditCourseIcon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CourseDetailsView = ({ id, name, status, description, priority }) => {
  const styles = useThemedStyles(styleSheetsCallback);
  const randomColor = useRandomColor(id);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onLongPress={() => {
        setShowEditIcon(!showEditIcon);
      }}
    >
      <StyledView rounded style={styles.container}>
        {showEditIcon && (
          <TouchableHighlight
            style={styles.editIcon}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <EditCourseIcon name="edit" size={20} />
          </TouchableHighlight>
        )}
        <View style={{ flexShrink: 1 }}>
          <StyledText h2 bold>
            {name}
          </StyledText>
          {status && <StyledText h5>Estado: {status}</StyledText>}
          {priority && <StyledText h5>Prioridad: {priority}</StyledText>}
          {description && (
            <StyledText h5 wrapText>
              Descripción: {description}
            </StyledText>
          )}
        </View>
        <View style={styles.iconContainer}>
          <StartSessionIcon name="play-circle" size={50} color={randomColor} />
        </View>
      </StyledView>
    </TouchableHighlight>
  );
};

const styleSheetsCallback = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 100,
    },
    iconContainer: {
      marginLeft: 12,
    },
    editIcon: {
      position: "absolute",
      top: -5,
      right: -5,
    },
  });

export default CourseDetailsView;
