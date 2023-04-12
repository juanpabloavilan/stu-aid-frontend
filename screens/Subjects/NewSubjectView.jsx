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

  //Form initial values
  const initialValues = {
    name: "",
    status: "active",
    courseId,
    createdAt: "Fecha de creación: " + new Date().toLocaleString(),
    updatedAt: "Fecha de modificación: " + new Date().toLocaleString(),
  };

  return (
    <StyledModalScreen>
      <StyledView main bgDefault paddingDefault style={styles.container}>
        <GoBackIcon
          goBack={() => navigation.goBack()}
          color={styles.goBackIcon.color}
        />

        <StyledView paddingDefault main bgDefault>
          <StyledText bold blue h2>
            Crear tema nuevo
          </StyledText>

          <SubjectForm
            initialValues={initialValues}
            onSubmit={execute}
            data={data}
            error={error}
            loading={loading}
          />
        </StyledView>
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