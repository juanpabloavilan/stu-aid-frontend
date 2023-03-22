import StyledTextInput from "../styled_components/StyledTextInput";
import { useField } from "formik";

const FormikTextInput = ({ name, textInputStyles, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.error && meta.touched;
  return (
    <>
      <StyledTextInput
        style={textInputStyles}
        value={field.value}
        onChangeText={(newValue) => helpers.setValue(newValue)}
        onBlur={() => helpers.setTouched(true)}
        showError={showError}
        errorInfo={meta.error}
        {...props}
      />
    </>
  );
};

export default FormikTextInput;
