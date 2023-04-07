import { useField } from "formik";
import { useRef, useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import StyledText from "../styled_components/StyledText";

const FormikAutoExpandingTextInput = ({
  name,
  textInputStyles,
  ...restOfProps
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.error && meta.touched;
  const [height, setHeight] = useState(30);
  const heightRef = useRef();

  useEffect(() => {
    if (height > heightRef) {
      heightRef.current = currentHeight;
    }
  }, [height]);
  return (
    <>
      <TextInput
        multiline={true}
        onContentSizeChange={(e) => {
          let currentHeight = e.nativeEvent.contentSize.height;
          setHeight(currentHeight);
        }}
        style={[
          textInputStyles,
          {
            height: Math.max(heightRef.current, height),
            backgroundColor: "cyan",
          },
        ]}
        value={field.value}
        onChangeText={(newValue) => helpers.setValue(newValue)}
        onBlur={() => helpers.setTouched(true)}
        {...restOfProps}
      />

      <StyledText>height: {height}</StyledText>
      <StyledText>heightRef: {heightRef.current}</StyledText>
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
