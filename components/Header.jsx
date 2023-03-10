import useThemedStyles from "../hooks/useThemedStyles";
import StyledView from "../styled_components/StyledView";
import { StyleSheet } from "react-native";
import StyledText from "../styled_components/StyledText";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";

/**
 *
 * TODO: Add styles to Header
 * RUN to test layout
 */

const Header = () => {
  const styles = useThemedStyles(stylesheetCallback);
  return (
    <StyledView bgDefault paddingDefault style={styles.headerSection}>
      <StyledView>
        <StyledText h1 bold blue>
          Stu-aid
        </StyledText>
      </StyledView>
      <StyledView>
        <ProfileIcon style={styles.profileIcon} name="user-circle" size={30} />
      </StyledView>
    </StyledView>
  );
};

const stylesheetCallback = (theme) =>
  StyleSheet.create({
    profileIcon: {
      color: theme.themeTokens.regularIconColor,
    },
    headerSection: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "red",
      paddingBottom: 16,
      borderBottomColor: theme.themeTokens.secondaryBackgroundColor,
      borderBottomWidth: 1,
      marginBottom: 16,
    },
  });

export default Header;
