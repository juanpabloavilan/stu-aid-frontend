import useThemedStyles from "../hooks/useThemedStyles";
import { TextInput, StyleSheet } from "react-native";
import StyledText from "./StyledText";

const StyledTextInput = ({
  style: propStyles = {},
  showError,
  errorInfo,
  ...props
}) => {
  const styles = useThemedStyles(stylesCallback);
  const inputStyle = [styles.txtInput, showError && styles.error, propStyles];
  return (
    <>
      <TextInput
        style={inputStyle}
        {...props}
        placeholderTextColor={
          styles.currentTheme.theme.themeTokens.regularIconColor
        }
      />
      {showError && (
        <StyledText error style={styles.errorMessage}>
          {errorInfo}
        </StyledText>
      )}
    </>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    txtInput: {
      placeholderTextColor: theme.themeTokens.regularIconColor,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginVertical: 10,
      color: theme.themeTokens.textColor,
      borderRadius: 5,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: theme.themeTokens.regularIconColor,
      flexShrink: 1,
    },
    error: {
      borderColor: theme.themeTokens.errorColor,
    },
    errorMessage: {
      marginTop: -10,
      marginLeft: 5,
    },
    currentTheme: {
      theme,
    },
  });

export default StyledTextInput;
