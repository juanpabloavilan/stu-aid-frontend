import { StyleSheet, Text, View, Modal } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";

const StyledModal = ({ children, visible, setVisible }) => {
  const styles = useThemedStyles(stylesCallback);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
};

export default StyledModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
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
