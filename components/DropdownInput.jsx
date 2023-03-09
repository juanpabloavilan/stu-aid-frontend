import DropDownPicker from "react-native-dropdown-picker";
import { useField } from "formik";
import useThemedStyles from "../hooks/useThemedStyles";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";

const DropdownInput = ({
  name,
  placeholder,
  items,
  initialValue,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.error && meta.touched;
  const styles = useThemedStyles(stylesCallback);
  const [value, setValue] = useState(initialValue || null);
  const [open, setOpen] = useState(false);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={field.value}
        items={items}
        setOpen={setOpen}
        setValue={(value) => {
          console.log(value);
          helpers.setValue(0);
        }}
        placeholder={placeholder}
        {...props}
      />
      <StyledText>Field {field.value}</StyledText>
      <StyledText>Value {value}</StyledText>

      <View>
        <StyledView error>{showError && meta.error}</StyledView>
      </View>
    </View>
  );
};

export default DropdownInput;

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {},
  });
