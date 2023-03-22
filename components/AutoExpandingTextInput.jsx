import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

const AutoExpandingTextInput = ({ style, initialValue, ...props }) => {
  const [text, setText] = useState(initialValue);
  const [height, setHeight] = useState(30);
  return (
    <TextInput
      {...props}
      multiline={true}
      onChangeText={setText}
      onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      style={[style, { height: Math.max(height, 18) }]}
      value={text}
    />
  );
};

export default AutoExpandingTextInput;

const styles = StyleSheet.create({});
