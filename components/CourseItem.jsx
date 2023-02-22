import { View, StyleSheet, TouchableHighlight } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import CourseIcon from "react-native-vector-icons/MaterialIcons";
import useRandomColor from "../hooks/useRandomColor";
import { useNavigation } from "@react-navigation/native";

const CourseItem = ({ id, name, status, description, priority }) => {
  const styles = useThemedStyles(styleSheetsCallback);
  const randomColor = useRandomColor(id);
  const navigate = useNavigate();
  return (
    <TouchableHighlight
      onPress={() => {
        navigate(`/home/courses/${id}`);
      }}
    >
      <StyledView rounded style={styles.container}>
        <View>
          <CourseIcon name="class" size={30} color={randomColor} />
        </View>
        <View style={{ flexShrink: 1, alignItems: "center" }}>
          <StyledText h3 bold>
            {name.toUpperCase()}
          </StyledText>
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
      gap: 20,
      flexDirection: "row",
      alignItems: "center",
    },
  });

export default CourseItem;
