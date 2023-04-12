import { StyleSheet, FlatList, View, Button } from "react-native";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import GoBackIcon from "../../components/GoBackIcon";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useThemedStyles from "../../hooks/useThemedStyles";
import useFetchSubject from "../../hooks/useFetchSubject";
import LoadingSpinner from "../../components/LoadingSpinner";
import FlashcardList from "../../components/FlashcardList";
import { useCallback } from "react";

const SubjectView = () => {
  const navigation = useNavigation();

  const {
    params: { subjectId, courseId },
  } = useRoute();

  //Obtener información del tema actual.
  const {
    data: subjectData,
    loading: loadingGet,
    error: errorGet,
    execute,
  } = useFetchSubject(courseId, subjectId);

  useFocusEffect(
    useCallback(() => {
      execute();
      console.log("fetching flashcards");
      return () => {
        console.log("Cleaning onFocusEffect");
      };
    }, [])
  );

  const styles = useThemedStyles(stylesCallback);

  return (
    <StyledView main bgDefault paddingDefault style={styles.container}>
      <GoBackIcon
        goBack={() => navigation.goBack()}
        color={styles.goBackIcon.color}
      />
      {loadingGet && <LoadingSpinner />}
      {subjectData && (
        <>
          {/* <Pressable onPress={onStudySubject}>
              <StyledView rounded green style={styles.button}>
                <StyledText bold white>
                  Repasar
                </StyledText>
              </StyledView>
            </Pressable> */}
          <FlashcardList
            subjectData={subjectData}
            subjectId={subjectId}
            courseId={courseId}
          />
        </>
      )}
      {errorGet && (
        <StyledView>
          <StyledText error h5>
            Hubo un error {errorGet}
          </StyledText>
        </StyledView>
      )}
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
    separator: {
      borderBottomColor: theme.themeTokens.secondaryBackgroundColor,
      borderBottomWidth: 0.2,
      marginVertical: 10,
    },
    buttonsToolbar: {
      flexDirection: "row",
      justifyContent: "flex-start",
      columnGap: 12,
    },
  });
