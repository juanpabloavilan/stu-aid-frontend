import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import SubjectForm from "./SubjectForm";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setFlashcards, addFlashcard } from "../reducers/flashcard.actions";
import FlashcardItem from "../components/FlashcardItem";
import usePostSubjectFlashcards from "../hooks/usePostSubjectFlashcards";
import useThemedStyles from "../hooks/useThemedStyles";
import StyledButton from "./StyledButton";
import StyledText from "../styled_components/StyledText";
import { useNavigation } from "@react-navigation/native";

const FlashcardList = ({ subjectData, subjectId, courseId }) => {
  // const flashcards = useSelector((state) => state.flashcards);
  // const dispatch = useDispatch();
  // const [selected, setSelected] = useState(-1);
  const navigation = useNavigation();

  const styles = useThemedStyles(stylesCallback);

  // useEffect(() => {
  //   if (subjectData) {
  //     const flashcardsRes = subjectData.flashcards;
  //     dispatch(setFlashcards(flashcardsRes));
  //   }
  // }, [subjectData]);

  // useEffect(() => {
  //   console.log("flashcards", flashcards);
  // }, [flashcards]);

  // Actualizar información del tema actual.
  const { data, loading, error, execute } = usePostSubjectFlashcards(
    courseId,
    subjectId
  );

  const upsertSubjectFlashcard = (values) => {
    delete values.createdAt;
    delete values.updatedAt;
    delete values.flashcards;
    console.log(values);
    execute(values);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <SubjectForm
          initialValues={subjectData}
          onSubmit={upsertSubjectFlashcard}
          data={data}
          error={error}
          loading={loading}
        />
      }
      data={subjectData.flashcards}
      keyExtractor={(item) => uuidv4()}
      renderItem={({ item }) => {
        return (
          <FlashcardItem {...item} courseId={courseId} subjectId={subjectId} />
        );
      }}
      ListFooterComponent={
        <View style={styles.buttonsToolbar}>
          <StyledButton
            rounded
            green
            padding
            onPress={() => {
              // dispatch(addFlashcard({ type: "front-reverse", subjectId }));
              navigation.navigate("FrontReverseQuestionModal", {
                subjectId,
                courseId,
              });
            }}
          >
            <StyledText white bold h4>
              Frente/Reverso
            </StyledText>
          </StyledButton>

          <StyledButton
            rounded
            blue
            padding
            onPress={() => {
              // dispatch(addFlashcard({ type: "true-false", subjectId }));
              navigation.navigate("TrueFalseQuestionModal", {
                subjectId,
                courseId,
              });
            }}
          >
            <StyledText white bold h4>
              Verdadero/Falso
            </StyledText>
          </StyledButton>

          <StyledButton
            rounded
            gray
            padding
            onPress={() => {
              // dispatch(addFlashcard({ type: "elaborated", subjectId }));
              navigation.navigate("ElaboratedQuestionModal", {
                subjectId,
                courseId,
              });
            }}
          >
            <StyledText white bold h4>
              Elaborada
            </StyledText>
          </StyledButton>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default FlashcardList;

const stylesCallback = (theme) =>
  StyleSheet.create({
    separator: {
      borderBottomColor: theme.themeTokens.secondaryBackgroundColor,
      borderBottomWidth: 0.2,
      marginVertical: 10,
    },
    buttonsToolbar: {
      marginTop: 12,
      justifyContent: "flex-start",
      gap: 12,
    },
  });
