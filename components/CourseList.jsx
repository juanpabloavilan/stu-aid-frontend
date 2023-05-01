import { FlatList, StyleSheet, Text, View, SectionList } from "react-native";
import React from "react";
import StyledText from "../styled_components/StyledText";
import AddButton from "./AddButton";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledView from "../styled_components/StyledView";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const CourseList = ({ courses }) => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);

  const [selectedCourse, setSelectedCourse] = useState(-1);
  useFocusEffect(
    useCallback(() => {
      setSelectedCourse(-1);
    }, [])
  );

  const courseSections = [
    {
      title: "Activos",
      data: courses?.filter(({ status }) => status === "active"),
    },
    {
      title: "Inactivos",
      data: courses?.filter(({ status }) => status !== "active"),
    },
  ];

  return (
    <StyledView main>
      <SectionList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <StyledText h5 gray underlined>
              Mantén presionada la clase para poderla editar o eliminar
            </StyledText>
          </View>
        }
        sections={courseSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CourseItem
            {...item}
            index={index}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionTitle}>
            <StyledText h4>{title}</StyledText>
          </View>
        )}
        SectionSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <StyledView paddingDefault>
            <StyledText error h4 bold>
              No tienes cursos
            </StyledText>
          </StyledView>
        }
        ListFooterComponent={
          <>
            <AddButton
              style={styles.addCourseButton}
              onPress={() => navigation.navigate("AddCourseModal")}
              text="Añadir curso"
            />
          </>
        }
      />
    </StyledView>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    courseListContainer: {
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    addCourseButton: {
      marginTop: 28,
      backgroundColor: theme.themeTokens.regularIconColor,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
    separator: {
      borderBottomColor: theme.themeTokens.secondaryBackgroundColor,
      borderBottomWidth: 0.2,
      marginVertical: 10,
    },
    sectionTitle: {
      marginTop: 10,
      backgroundColor: theme.themeTokens.secondaryBackgroundColor,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 8,
      alignSelf: "flex-start",
      borderLeftColor: theme.themeTokens.regularIconColor,
      borderLeftWidth: 6,
    },
  });

export default CourseList;

const styles = StyleSheet.create({});
