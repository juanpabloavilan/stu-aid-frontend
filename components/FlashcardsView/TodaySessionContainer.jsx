import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import StyledText from "../../styled_components/StyledText";
import StyledButton from "../StyledButton";
import PlaySessionIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const TodaySessionContainer = () => {
  const styles = useThemedStyles(stylesCallback);
  const navigation = useNavigation();
  return (
    <StyledView rounded style={styles.container}>
      <Image style={styles.img} source={require("../../assets/studying.png")} />
      <StyledText h2 blue bold>
        Empezar sesión de estudio
      </StyledText>
      <StyledButton
        onPress={() => {
          navigation.navigate("Study session timer");
        }}
      >
        <PlaySessionIcon style={styles.playIcon} name="play" size={45} />
      </StyledButton>
    </StyledView>
  );
};

export default TodaySessionContainer;

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    img: {
      width: 100,
      height: 100,
      marginBottom: 12,
    },
    playIcon: {
      color: theme.themeTokens.colors.blue,
    },
  });
