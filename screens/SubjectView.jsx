import { StyleSheet, Pressable } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import GoBackIcon from "../components/GoBackIcon";
import { useNavigation } from "@react-navigation/native";
import SubjectFlashcardsNotes from "../components/SubjectFlashcardsNotes";
import useThemedStyles from "../hooks/useThemedStyles";
import usePostSubjectFlashcards from "../hooks/usePostSubjectFlashcards";

const SubjectView = () => {
  const navigation = useNavigation();
  const styles = useThemedStyles(stylesCallback);
  const { data, loading, error, execute } = usePostSubjectFlashcards();

  // IMPLEMENTAR const {dataGet, loadingGet, errorGet, executeGet} = useFetchSubject()

  const onStudySubject = () => {
    console.log("Reviewing this subject");
  };
  return (
    <StyledView main bgDefault paddingDefault style={styles.container}>
      <GoBackIcon
        goBack={() => navigation.goBack()}
        color={styles.goBackIcon.color}
      />
      <StyledView bgDefault>
        <Pressable onPress={onStudySubject}>
          <StyledView rounded green style={styles.button}>
            <StyledText bold white>
              Repasar
            </StyledText>
          </StyledView>
        </Pressable>
      </StyledView>

      <StyledView main bgDefault>
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

export default SubjectView;

const stylesCallback = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 40,
    },
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
    },
    button: {
      alignSelf: "flex-end",
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
  });
