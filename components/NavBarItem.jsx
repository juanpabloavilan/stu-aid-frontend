import useThemedStyles from "../hooks/useThemedStyles";
import { StyleSheet } from "react-native";
import StyledText from "../styled_components/StyledText";

const NavBarItem = ({ to, name, ...restOfProps }) => {
  const { pathname } = useLocation();
  const styles = useThemedStyles(stylesheetCallback);
  const tabStyles = [styles.barTab, pathname === to && styles.active];
  console.log(pathname);
  return (
    <Link to={to} {...restOfProps}>
      <StyledText style={tabStyles} h3>
        {name}
      </StyledText>
    </Link>
  );
};
const stylesheetCallback = (theme) =>
  StyleSheet.create({
    barTab: {
      backgroundColor: theme.themeTokens.backgroundColor,
      color: theme.themeTokens.regularIconColor,
      paddingHorizontal: 10,
    },
    active: {
      fontStyle: "bold",
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      color: theme.themeTokens.textColor,
    },
  });

export default NavBarItem;
