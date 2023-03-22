import { StyleSheet, Pressable, FlatList, View, Button } from "react-native";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import GoBackIcon from "../components/GoBackIcon";
import FrontReverseQuestion from "../components/FrontReverseQuestion";
import TrueFalseQuestion from "../components/TrueFalseQuestion";
import ElaboratedQuestion from "../components/ElaboratedQuestion";
import SubjectForm from "../components/SubjectForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import SubjectFlashcardsNotes from "../components/SubjectFlashcardsNotes";
import useThemedStyles from "../hooks/useThemedStyles";
import usePostSubjectFlashcards from "../hooks/usePostSubjectFlashcards";
import useFetchSubject from "../hooks/useFetchSubject";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";

const SubjectView = () => {
  const navigation = useNavigation();
  const {
    params: { subjectId, courseId },
  } = useRoute();
  const { data, loading, error, execute } = usePostSubjectFlashcards(
    courseId,
    subjectId
  );
  const {
    data: subjectData,
    loading: loadingGet,
    error: errorGet,
  } = useFetchSubject(courseId, subjectId);

  const [flashcards, setFlashcards] = useState();

  useEffect(() => {
    if (subjectData) {
      setFlashcards(subjectData.flashcards);
    }
  }, [subjectData]);

  useEffect(() => {
    console.log(flashcards);
  }, [flashcards]);

  const upsertSubjectFlashcard = (values) => {
    const data = { flashcards, ...values };
    delete data.createdAt;
    delete data.updatedAt;
    execute(data);
  };

  const styles = useThemedStyles(stylesCallback);

  const addFlashcard = (type) => {
    setFlashcards([
      ...flashcards,
      {
        pos: flashcards.length + 1,
        subjectId: subjectData.id,
        type: type,
        status: "active",
        payload: {},
      },
    ]);
    console.log(flashcards);
  };

  const onStudySubject = () => {
    console.log("Reviewing this subject");
  };

  return (
    <StyledView main bgDefault paddingDefault style={styles.container}>
      <GoBackIcon
        goBack={() => navigation.goBack()}
        color={styles.goBackIcon.color}
      />
      {loadingGet && <LoadingSpinner />}
      {subjectData && (
        <>
          <StyledView bgDefault>
            <Pressable onPress={onStudySubject}>
              <StyledView rounded green style={styles.button}>
                <StyledText bold white>
                  Repasar
                </StyledText>
              </StyledView>
            </Pressable>
          </StyledView>

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <SubjectForm
                initialValues={{
                  ...subjectData,
                  createdAt:
                    "Fecha de creación: " +
                    new Date(subjectData.createdAt).toLocaleString(),
                  updatedAt:
                    "Fecha de modificación: " +
                    new Date(subjectData.updatedAt).toLocaleString(),
                }}
                onSubmit={upsertSubjectFlashcard}
                data={data}
                error={error}
                loading={loading}
              />
            }
            data={flashcards}
            keyExtractor={(item) => item.id || item.pos}
            renderItem={({ item }) => {
              if (item.type === "front-reverse") {
                return (
                  <FrontReverseQuestion
                    {...item}
                    setFlashcards={setFlashcards}
                  />
                );
              }
              if (item.type === "true-false") {
                return (
                  <TrueFalseQuestion {...item} setFlashcards={setFlashcards} />
                );
              }
              if (item.type === "elaborated") {
                return (
                  <ElaboratedQuestion {...item} setFlashcards={setFlashcards} />
                );
              }
            }}
            ListFooterComponent={
              <View style={styles.buttonsToolbar}>
                <Button
                  title="frente/reverso"
                  onPress={() => addFlashcard("front-reverse")}
                />
                <Button
                  title="verdadero/falso"
                  onPress={() => addFlashcard("true-false")}
                />
                <Button
                  title="elaborada"
                  onPress={() => addFlashcard("elaborated")}
                />
              </View>
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </>
      )}
      {error && (
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
