import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";
import useThemedStyles from "../hooks/useThemedStyles";
import { Outlet } from "react-router-native";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NavBarItem from "../components/NavBarItem";

const HomeView = () => {
  return (
    <StyledView main bgDefault>
      <Header />
      <StyledView>
        <NavBar>
          <NavBarItem to="/home/quick-flashcards" name="Flashcards" />
          <NavBarItem to="/home/courses" name="Cursos" />
        </NavBar>
        <Outlet />
      </StyledView>
    </StyledView>
  );
};

const styleSheetsCallback = (theme) => StyleSheet.create({});

export default HomeView;
