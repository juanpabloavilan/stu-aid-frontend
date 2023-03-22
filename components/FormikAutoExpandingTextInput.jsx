import { useField } from "formik";
import AutoExpandingTextInput from "./AutoExpandingTextInput";
import { StyleSheet } from "react-native";

const FormikAutoExpandingTextInput = ({
  style,
  name,
  textInputStyles,
  ...restOfProps
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.error && meta.touched;
  return (
    <>
      <AutoExpandingTextInput
        style={textInputStyles}
        initialValue={field.value}
        onChangeText={(newValue) => helpers.setValue(newValue)}
        onBlur={() => helpers.setTouched(true)}
        {...restOfProps}
      />
      {showError && (
        <StyledText error style={styles.errorMessage}>
          {meta.error}
        </StyledText>
      )}
    </>
  );
};

export default FormikAutoExpandingTextInput;

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: -10,
    marginLeft: 5,
  },
});
