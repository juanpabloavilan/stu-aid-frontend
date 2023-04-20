import { StyleSheet } from "react-native";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import GoBackIcon from "../../components/GoBackIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import SubjectFlashcardsNotes from "../../components/SubjectFlashcardsNotes";
import useThemedStyles from "../../hooks/useThemedStyles";
import usePostSubjectFlashcards from "../../hooks/usePostSubjectFlashcards";
import StyledModalScreen from "../../components/StyledModalScreen";
import SubjectForm from "../../components/SubjectForm";
import { useEffect } from "react";
const NewSubjectView = () => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);
  const {
    params: { courseId },
  } = useRoute();
  const { data, loading, error, execute } = usePostSubjectFlashcards(courseId);

  useEffect(() => {
    if (data) {
      navigation.goBack();
    }
  }, [data]);

  const onSubmitNewSubject = (values) => {
    delete values.createdAt;
    delete values.updatedAt;
    execute(values);
  };

  //Form initial values
  const initialValues = {
    name: "",
    status: "active",
    courseId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <StyledModalScreen>
      <StyledView>
        <StyledText bold blue h2>
          Crear tema nuevo
        </StyledText>

        <SubjectForm
          initialValues={initialValues}
          onSubmit={onSubmitNewSubject}
          data={data}
          error={error}
          loading={loading}
        />
      </StyledView>
    </StyledModalScreen>
  );
};

export default NewSubjectView;

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 40,
    },
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
    },
  });
