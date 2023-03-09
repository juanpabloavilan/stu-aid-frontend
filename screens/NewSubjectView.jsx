import { StyleSheet } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import Header from "../components/Header";
import GoBackIcon from "../components/GoBackIcon";
import { useNavigation } from "@react-navigation/native";
import SubjectFlashcardsNotes from "../components/SubjectFlashcardsNotes";
import useThemedStyles from "../hooks/useThemedStyles";
import usePostSubjectFlashcards from "../hooks/usePostSubjectFlashcards";

const NewSubjectView = () => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);
  const { data, loading, error, execute } = usePostSubjectFlashcards();

  return (
    <StyledView main bgDefault paddingDefault>
      <GoBackIcon
        goBack={() => navigation.goBack()}
        color={styles.goBackIcon.color}
      />

      <StyledView paddingDefault main bgDefault>
        <StyledText bold blue h2>
          Crear tema nuevo
        </StyledText>

        <SubjectFlashcardsNotes
          initialValues={{
            name: "",
            status: "active",
          }}
          onSubmit={execute}
          data={data}
          error={error}
          loading={loading}
        />
      </StyledView>
    </StyledView>
  );
};

export default NewSubjectView;

const stylesCallback = (theme) =>
  StyleSheet.create({
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
    },
  });
