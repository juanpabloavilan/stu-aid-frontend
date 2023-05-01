import { FlatList, StyleSheet } from "react-native";
import SubjectItem from "./SubjectItem";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import AddButton from "./AddButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";
import { useState } from "react";
import { useCallback } from "react";

const SubjectsList = ({ subjectsList, courseId }) => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);

  const [selectedSubject, setSelectedSubject] = useState(-1);
  useFocusEffect(
    useCallback(() => {
      setSelectedSubject(-1);
    }, [])
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={subjectsList}
      renderItem={({ item, index }) => (
        <SubjectItem
          {...item}
          index={index}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      )}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <>
          <AddButton
            style={styles.addCourseButton}
            onPress={() => navigation.navigate("New subject", { courseId })}
            text="Añadir tema"
          />
        </>
      }
      ListEmptyComponent={
        <StyledView style={styles.emptyComponent}>
          <StyledText h4 red bold>
            No tienes temas
          </StyledText>
        </StyledView>
      }
    />
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: { paddingHorizontal: 8, paddingVertical: 12 },
    addCourseButton: {
      marginTop: 28,
      backgroundColor: theme.themeTokens.regularIconColor,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
    emptyComponent: {
      marginTop: 28,
    },
  });

export default SubjectsList;
