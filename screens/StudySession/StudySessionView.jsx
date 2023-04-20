import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useStudySession from "../../hooks/useStudySession";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import GoBackIcon from "../../components/GoBackIcon";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useState } from "react";
import FlashcardCard from "../../components/FlashcardsView/FlashcardCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

const StudySessionView = () => {
  const { params } = useRoute();
  const subject = params?.subject ?? null;
  const course = params?.course ?? null;
  const navigation = useNavigation();

  const options = {};

  if (subject) {
    options.subject = subject;
  }
  if (course) {
    options.course = course;
  }

  const {
    data = {
      flashcards: [],
    },
    loading,
  } = useStudySession(options);

  const styles = useThemedStyles(stylesCallback);

  //Animation values
  const scrollXIndexAnimated = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = (index) => {
    setCurrentIndex(index + 1);
    scrollXIndexAnimated.value = index + 1;
    console.log("currentCard", index, "nextCard", scrollXIndexAnimated.value);
    if (index + 1 === data?.flashcards.length) {
      scrollXIndexAnimated.value = 0;
      console.log("Going to session complete");
      navigation.navigate("Session Completed");
    }
  };

  useEffect(() => {
    console.log("xIndex", scrollXIndexAnimated.value, data?.flashcards);
  });

  return (
    <StyledView main bgDefault>
      <GoBackIcon
        style={styles.goBackIcon}
        goBack={() => navigation.navigate("Home")}
        color={styles.goBackIcon.color}
      />

      {loading && <LoadingSpinner />}

      {!loading && data?.flashcards && data.flashcards.length > 0 && (
        <FlatList
          data={data.flashcards}
          keyExtractor={(item, index) => String(item.id)}
          horizontal
          inverted
          scrollEnabled={false}
          removeClippedSubviews={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
          renderItem={({ item, index }) => (
            <FlashcardCard
              flashcard={item}
              index={index}
              scrollXIndexAnimated={scrollXIndexAnimated}
              showing={index === currentIndex}
              nextCard={nextCard}
            />
          )}
          CellRendererComponent={({
            item,
            index,
            children,
            style,
            ...props
          }) => {
            const newStyle = [
              style,
              { zIndex: data.flashcards.length - index },
            ];
            return (
              <View style={newStyle} index={index} {...props}>
                {children}
              </View>
            );
          }}
        />
      )}

      {!loading && data?.flashcards.length === 0 && (
        <StyledView main paddingDefault>
          <StyledText h2 bold>
            No tienes flashcards para repasar
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

export default StudySessionView;

const stylesCallback = (theme) =>
  StyleSheet.create({
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
    },
    cardContainerWrapper: {
      position: "absolute",
      padding: 12,
      height: "100%",
      width: "100%",
      backgroundColor: "cyan",
      alignSelf: "center",
    },
  });
