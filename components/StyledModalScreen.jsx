import { View, Pressable, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledView from "../styled_components/StyledView";

const StyledModalScreen = ({ children }) => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={navigation.goBack}
      />
      <View style={[styles.viewAnimated]}>
        <StyledView bgDefault style={styles.viewContainer}>
          {children}
        </StyledView>
      </View>
    </View>
  );
};

export default StyledModalScreen;

const stylesCallback = (theme) =>
  StyleSheet.create({
    viewAnimated: {
      width: "100%",
    },
    viewContainer: {
      margin: 10,
      borderRadius: 16,
      paddingVertical: 30,
      paddingHorizontal: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
  });
