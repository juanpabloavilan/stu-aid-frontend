import { StyleSheet, FlatList, View, Button } from "react-native";
import StyledView from "../../styled_components/StyledView";
import StyledText from "../../styled_components/StyledText";
import GoBackIcon from "../../components/GoBackIcon";
import FrontReverseQuestion from "../../components/FrontReverseQuestion";
import TrueFalseQuestion from "../../components/TrueFalseQuestion";
import ElaboratedQuestion from "../../components/ElaboratedQuestion";
import SubjectForm from "../../components/SubjectForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import useThemedStyles from "../../hooks/useThemedStyles";
import usePostSubjectFlashcards from "../../hooks/usePostSubjectFlashcards";
import useFetchSubject from "../../hooks/useFetchSubject";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useCallback, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FLASHCARD_ACTIONS } from "../../reducers/flashcards.reducer";
import { reducer } from "../../reducers/flashcards.reducer";

const SubjectView = () => {
  const navigation = useNavigation();

  const {
    params: { subjectId, courseId },
  } = useRoute();

  // Actualizar información del tema actual.
  const { data, loading, error, execute } = usePostSubjectFlashcards(
    courseId,
    subjectId
  );

  //Obtener información del tema actual.
  const {
    data: subjectData,
    loading: loadingGet,
    error: errorGet,
  } = useFetchSubject(courseId, subjectId);

  // const [flashcards, dispatch] = useFlashcards([]);
  const [flashcards, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (subjectData) {
      const action = {
        type: FLASHCARD_ACTIONS.setFlashcards,
        payload: { newFlashcards: subjectData.flashcards },
      };

      dispatch(action);
    }
  }, [subjectData]);

  useEffect(() => {
    console.log("flashcards", flashcards);
  }, [flashcards]);

  const upsertSubjectFlashcard = (values) => {
    const data = { values };
    delete data.createdAt;
    delete data.updatedAt;
    console.log(data);
    execute(data);
  };

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

          <FlatList
            // showsVerticalScrollIndicator={false}
            // showsHorizontalScrollIndicator={false}
            // ListHeaderComponent={
            //   <SubjectForm
            //     flashcards={flashcards}
            //     initialValues={subjectData}
            //     onSubmit={upsertSubjectFlashcard}
            //     data={data}
            //     error={error}
            //     loading={loading}
            //   />
            // }
            initialNumToRender={5}
            // getItemLayout={(data, index) => ({
            //   length: 200,
            //   offset: 200 * index,
            //   index: index,
            // })}
            data={flashcards}
            extraData={flashcards}
            keyExtractor={(item) => uuidv4()}
            renderItem={({ item }) => {
              console.log(item);
              if (item.type === "front-reverse") {
                return (
                  <FrontReverseQuestion
                    {...item}
                    flashcards={flashcards}
                    dispatch={dispatch}
                    selected={selected === item.id}
                    setSelected={setSelected}
                  />
                );
              }
              if (item.type === "true-false") {
                return (
                  <TrueFalseQuestion
                    {...item}
                    flashcards={flashcards}
                    dispatch={dispatch}
                  />
                );
              }
              if (item.type === "elaborated") {
                return (
                  <ElaboratedQuestion
                    {...item}
                    flashcards={flashcards}
                    dispatch={dispatch}
                  />
                );
              }
            }}
            ListFooterComponent={
              <View style={styles.buttonsToolbar}>
                <Button
                  title="frente/reverso"
                  onPress={() =>
                    dispatch({
                      type: FLASHCARD_ACTIONS.addFlashcard,
                      payload: { subjectId: subjectId, type: "front-reverse" },
                    })
                  }
                />
                <Button
                  title="verdadero/falso"
                  onPress={() =>
                    dispatch({
                      type: FLASHCARD_ACTIONS.addFlashcard,
                      payload: { subjectId: subjectId, type: "true-false" },
                    })
                  }
                />
                <Button
                  title="elaborada"
                  onPress={() =>
                    dispatch({
                      type: FLASHCARD_ACTIONS.addFlashcard,
                      payload: { subjectId: subjectId, type: "elaborated" },
                    })
                  }
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
