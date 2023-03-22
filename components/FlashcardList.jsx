import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useState } from "react";
import FrontReverseQuestion from "./FrontReverseQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import ElaboratedQuestion from "./ElaboratedQuestion";
import useThemedStyles from "../hooks/useThemedStyles";
import SubjectForm from "./SubjectForm";

const FlashcardList = ({ initialValues, onSubmit, data, error, loading }) => {
  const [flashcards, setFlashcards] = useState(initialValues.flashcards);
  const styles = useThemedStyles(stylesCallback);

  const addFlashcard = (type) => {
    setFlashcards([
      ...flashcards,
      {
        pos: flashcards.lenght + 1,
        subjectId: initialValues.id,
        type: type,
        status: "active",
        payload: {},
      },
    ]);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <SubjectForm
          initialValues={initialValues}
          onSubmit={onSubmit}
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
            <FrontReverseQuestion {...item} setFlashcards={setFlashcards} />
          );
        }
        if (item.type === "true-false") {
          return <TrueFalseQuestion {...item} setFlashcards={setFlashcards} />;
        }
        if (item.type === "elaborated") {
          return <ElaboratedQuestion {...item} setFlashcards={setFlashcards} />;
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
