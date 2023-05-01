import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../styled_components/StyledText";

const SessionTimer = ({ timer }) => {
  //Timer values
  const [time, setTime] = useState(timer ?? 0);
  const navigation = useNavigation();
  useEffect(() => {
    const startTimer = setInterval(tic, 1000);
    return () => clearInterval(startTimer);
  });

  const tic = () => {
    if (time === 0) {
      navigation.navigate("Session Completed");
    }
    if (time > 0) {
      setTime(time - 1);
    }
  };
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formatedMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const formatedSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
  return (
    <View style={{ flexDirection: "row", padding: 4 }}>
      <StyledText bold h4>
        {formatedMinutes}:{formatedSeconds}
      </StyledText>
    </View>
  );
};

export default SessionTimer;

const styles = StyleSheet.create({});
