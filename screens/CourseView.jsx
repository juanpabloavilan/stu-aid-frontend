import { StyleSheet } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import useFetchCourseSubjects from "../hooks/useFetchCourseSubjects";
import useRandomColor from "../hooks/useRandomColor";
import { useParams } from "react-router-native";
import SubjectsList from "../components/SubjectsList";
import CourseItem from "../components/CourseItem";

const CourseView = () => {
  const { courseId } = useParams();
  const color = useRandomColor(courseId);
  const styles = useThemedStyles(stylesCallback);
  const { loading, data, error } = useFetchCourseSubjects(Number(courseId));

  if (data) {
    console.log(data);
    const { name, description, priority, status, subjects } = data;
  }

  return (
    <StyledView main>
      {data ? (
        <>
          {/* <StyledView
            rounded
            style={[styles.courseContainer, { backgroundColor: color }]}
          >
            
              {name && <StyledText h2 bold> name </StyledText>}
            
            <StyledText p>Descripción: {description}</StyledText>
            <StyledText p>Prioridad: {priority}</StyledText>
            <StyledText p>Status: {status}</StyledText>
          </StyledView> */}
          <CourseItem {...data} />
          <SubjectsList subjectsList={data.subjects} />
        </>
      ) : (
        <StyledView>
          <StyledText>Loading</StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    courseContainer: {
      backgroundColor: "red",
    },
  });

export default CourseView;
