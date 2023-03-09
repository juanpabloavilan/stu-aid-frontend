import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useFetchCourses from "../hooks/useFetchCourses";
import useThemedStyles from "../hooks/useThemedStyles";
import { StyleSheet } from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import CourseList from "../components/CourseList";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";

const MyCoursesView = () => {
  const { loading, error, data: courses, fetchCourses } = useFetchCourses();
  const styles = useThemedStyles(stylesCallback);

  const callback = useCallback(() => {
    fetchCourses();
    return () => {
      console.log("Cleaning effect");
    };
  }, []);

  useFocusEffect(callback);

  return (
    <StyledView main paddingDefault style={styles.courseListContainer}>
      <StyledText h2 bold>
        Mis cursos
      </StyledText>

      {loading && <LoadingSpinner />}

      {courses && <CourseList courses={courses} />}

      {error && (
        <StyledText error bold>
          {error.message}
        </StyledText>
      )}
    </StyledView>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    courseListContainer: {
      paddingBottom: 14,
    },
    addCourseButton: {
      marginTop: 28,
      backgroundColor: theme.themeTokens.regularIconColor,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
    },
  });

export default MyCoursesView;
