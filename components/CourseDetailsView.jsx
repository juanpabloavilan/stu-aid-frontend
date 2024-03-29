import { View, StyleSheet, Pressable } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import StartSessionIcon from "react-native-vector-icons/FontAwesome5";
import useRandomColor from "../hooks/useRandomColor";
import { useNavigation } from "@react-navigation/native";

const CourseDetailsView = ({ id, name, status, description, priority }) => {
  const styles = useThemedStyles(styleSheetsCallback);
  const randomColor = useRandomColor(id);
  const navigation = useNavigation();

  return (
    <StyledView rounded style={styles.container}>
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
      <Pressable
        onPress={() => navigation.navigate("Study Session", { course: id })}
      >
        <View style={styles.iconContainer}>
          <StartSessionIcon name="play-circle" size={50} color={randomColor} />
        </View>
      </Pressable>
    </StyledView>
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
    },
  });

export default CourseDetailsView;
