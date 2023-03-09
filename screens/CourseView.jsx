import { StyleSheet, ActivityIndicator } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import useThemedStyles from "../hooks/useThemedStyles";
import useFetchCourseSubjects from "../hooks/useFetchCourseSubjects";
import useRandomColor from "../hooks/useRandomColor";
import NavigationTab from "../navigation/NavigationTab";
import Header from "../components/Header";
import SubjectsList from "../components/SubjectsList";
import CourseDetailsView from "../components/CourseDetailsView";
import GoBackIcon from "../components/GoBackIcon";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const CourseView = ({ route, navigation }) => {
  const { id } = route.params;
  const color = useRandomColor(id);
  const styles = useThemedStyles(stylesCallback);
  const { loading, data, error, execute } = useFetchCourseSubjects(Number(id));

  const onFocusEffect = useCallback(() => {
    execute();
    return () => {
      console.log("Cleaning onFocusEffect");
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <StyledView main bgDefault>
      <Header />
      <StyledView>
        <GoBackIcon
          style={styles.goBackIcon}
          goBack={navigation.goBack}
          color={styles.goBackIcon.color}
        />
        <StyledView>
          {loading && <LoadingSpinner />}
          {data && (
            <StyledView paddingDefault>
              <CourseDetailsView {...data} />
              <SubjectsList subjectsList={data.subjects} />
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    courseContainer: {
      backgroundColor: "red",
    },
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
      marginTop: 16,
    },
  });

export default CourseView;
