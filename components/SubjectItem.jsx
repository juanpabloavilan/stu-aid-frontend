import useRandomColor from "../hooks/useRandomColor";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import { StyleSheet } from "react-native";

const SubjectItem = ({ id, courseId, name, status }) => {
  const styles = useThemedStyles(stylesCallback);
  const color = useRandomColor(id);
  return (
    <StyledView
      rounded
      bgSecondary
      style={[styles.container, { borderColor: color }]}
    >
      <StyledText h3 bold>
        {name}
      </StyledText>
      <StyledText p>{status}</StyledText>
    </StyledView>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingHorizontal: 24,
      borderLeftWidth: 8,
    },
  });

export default SubjectItem;
