import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, Touchable } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { useField } from "formik";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";

const SwitchInput = ({
  name,
  placeholder,
  initialValue,
  trueValue,
  falseValue,
  trueLabel,
  falseLabel,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.error && meta.touched;
  const styles = useThemedStyles(stylesCallback);
  const [isEnabled, setIsEnabled] = useState();

  useEffect(() => {
    setIsEnabled(
      initialValue ? (initialValue === trueValue ? true : false) : false
    );
  }, []);

  useEffect(() => {
    helpers.setValue(isEnabled ? trueValue : falseValue);
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <>
      <View style={styles.switchContainer}>
        <StyledText gray h5>
          {placeholder}
        </StyledText>
        <View style={{ alignItems: "flex-end" }}>
          <Switch
            trackColor={{
              false: styles.false.color,
              true: styles.true.color,
            }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <View style={{ marginTop: 8 }}>
            <StyledText>{isEnabled ? trueLabel : falseLabel}</StyledText>
          </View>
        </View>
      </View>
      <View>
        <StyledView error style={{ marginTop: 8 }}>
          {showError && meta.error}
        </StyledView>
      </View>
    </>
  );
};

export default SwitchInput;

const stylesCallback = (theme) =>
  StyleSheet.create({
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 10,
    },
    false: {
      color: theme.themeTokens.errorColor,
    },
    true: {
      color: theme.themeTokens.successColor,
    },
  });
