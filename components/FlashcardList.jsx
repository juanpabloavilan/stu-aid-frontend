import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Touchable,
} from "react-native";
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
  const flashcards = useSelector((state) => state.flashcards);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(-1);
  const navigation = useNavigation();

  const styles = useThemedStyles(stylesCallback);

  useEffect(() => {
    if (subjectData) {
      const flashcardsRes = subjectData.flashcards;
      dispatch(setFlashcards(flashcardsRes));
    }
  }, [subjectData]);

  useEffect(() => {
    console.log("flashcards", flashcards);
  }, [flashcards]);

  // Actualizar información del tema actual.
  const { data, loading, error, execute } = usePostSubjectFlashcards(
    courseId,
    subjectId
  );

  const upsertSubjectFlashcard = (values) => {
    const data = { values };
    delete data.createdAt;
    delete data.updatedAt;
    console.log(data);
    execute(data);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <SubjectForm
          flashcards={flashcards}
          initialValues={subjectData}
          onSubmit={upsertSubjectFlashcard}
          data={data}
          error={error}
          loading={loading}
        />
      }
      data={flashcards}
      extraData={flashcards}
      keyExtractor={(item) => uuidv4()}
      renderItem={({ item }) => {
        return (
          <FlashcardItem
            {...item}
            dispatch={dispatch}
            selected={selected}
            setSelected={setSelected}
          />
        );
      }}
      ListFooterComponent={
        <View style={styles.buttonsToolbar}>
          <StyledButton
            rounded
            green
            padding
            onPress={() => {
              dispatch(addFlashcard({ type: "front-reverse", subjectId }));
              navigation.navigate("FrontReverseQuestionModal");
            }}
          >
            <StyledText white bold h4>
              Frente/Reverso
            </StyledText>
          </StyledButton>

          <StyledButton
            rounded
            yellow
            padding
            onPress={() => {
              dispatch(addFlashcard({ type: "true-false", subjectId }));
              navigation.navigate("TrueFalseQuestionModal");
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
              dispatch(addFlashcard({ type: "elaborated", subjectId }));
              navigation.navigate("ElaboratedQuestionModal");
            }}
          >
            <StyledText white bold h4>
              Verdadero/Falso
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
      flexDirection: "row",
      justifyContent: "flex-start",
      columnGap: 12,
    },
  });
