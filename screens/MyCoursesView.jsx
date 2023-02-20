import CourseItem from "../components/CourseItem";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useFetchCourses from "../hooks/useFetchCourses";
import useThemedStyles from "../hooks/useThemedStyles";
import { StyleSheet, FlatList } from "react-native";
import { Outlet } from "react-router-native";

const MyCoursesView = () => {
  const { loading, error, data: courses } = useFetchCourses();
  const styles = useThemedStyles(stylesCallback);

  if (loading) {
    return (
      <StyledView>
        <StyledText>Cargando</StyledText>
      </StyledView>
    );
  } else {
    return (
      <StyledView style={styles.courseListContainer}>
        {courses && courses.length > 0 ? (
          <FlatList
            data={courses}
            renderItem={({ item }) => <CourseItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <StyledText error L bold>
            No tienes cursos
          </StyledText>
        )}
      </StyledView>
    );
  }
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    courseListContainer: {
      paddingBottom: 14,
    },
  });

export default MyCoursesView;
