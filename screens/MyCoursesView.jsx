import CourseItem from "../components/CourseItem";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useFetchCourses from "../hooks/useFetchCourses";
import useThemedStyles from "../hooks/useThemedStyles";
import { StyleSheet, FlatList } from "react-native";

const MyCoursesView = () => {
  const { loading, error, data: courses } = useFetchCourses();
  const styles = useThemedStyles(stylesCallback);
  console.log(courses);
  if (loading) {
    return (
      <StyledView>
        <StyledText>Cargando</StyledText>
      </StyledView>
    );
  } else {
    return (
      <StyledView>
        <StyledView style={{ padding: 14 }}>
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
      </StyledView>
    );
  }
};

const stylesCallback = (theme) => StyleSheet.create({});

export default MyCoursesView;
