import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ step, steps, height }) => {
  const styles = useThemedStyles(stylesCallback);
  const progress = useSharedValue(-1000);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    progress.value = -width + (width * step) / steps;
  }, [step, width]);

  const progressBarAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(progress.value, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <View style={{ padding: 8, marginBottom: 12 }}>
      <StyledText style={{}}>
        {step}/{steps}
      </StyledText>
      <View>
        <View
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          style={[{ height, borderRadius: height }, styles.progressBar]}
        />

        <Animated.View
          style={[
            { height, borderRadius: height },
            styles.currentProgressBar,
            progressBarAnimation,
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

const stylesCallback = (theme) =>
  StyleSheet.create({
    currentProgressBar: {
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: theme.themeTokens.regularIconColor,
      width: "100%",
      overflow: "hidden",
    },
    progressBar: {
      width: "100%",
      overflow: "hidden",
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
    },
  });
