import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import NavBar from "../components/NavBar";
import NavBarItem from "../components/NavBarItem";
import NavigationTab from "../navigation/NavigationTab";
import Header from "../components/Header";

const HomeView = () => {
  return (
    <StyledView bgDefault style={{ flex: 1, flexShrink: 1 }}>
      <Header />
      <NavigationTab />
    </StyledView>
  );
};

const styleSheetsCallback = (theme) => StyleSheet.create({});

export default HomeView;
