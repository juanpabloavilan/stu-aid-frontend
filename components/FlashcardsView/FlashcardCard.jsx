import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ScoreBoard from "./BackAnswerBoard";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.7;

const FlashcardCard = ({
  nextCard,
  flashcard,
  index,
  scrollXIndexAnimated,
  showing,
}) => {
  //Carousel card animation styles
  const cardCarouselAnimatedStyles = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateXValue = interpolate(
      scrollXIndexAnimated.value,
      inputRange,
      [CARD_WIDTH / 6, 0, -CARD_WIDTH - 100]
    );

    const scaleValue = interpolate(
      scrollXIndexAnimated.value,
      inputRange,
      [0.8, 1, 1.3]
    );

    const opacityValue = interpolate(scrollXIndexAnimated.value, inputRange, [
      1 - 1 / 3,
      1,
      0,
    ]);

    return {
      transform: [
        {
          translateX: withSpring(translateXValue, { duration: 1000 }),
        },
        {
          scale: withSpring(scaleValue, { duration: 1000 }),
        },
      ],
      opacity: withSpring(opacityValue),
    };
  });

  const rotate = useSharedValue(0);

  //Flip front card animation styles
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  //Flip back card animation styles
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const answerOptionsAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const rotateFlashcard = () => {
    if (!showing) return;
    if (rotate.value === 0) {
      rotate.value = 1;
    } else {
      rotate.value = 0;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.card, cardCarouselAnimatedStyles]}>
        <View>
          <Animated.View style={[styles.frontCard, frontAnimatedStyles]}>
            <FrontCard flashcard={flashcard} rotate={rotateFlashcard} />
          </Animated.View>
          <Animated.View style={[styles.backCard, backAnimatedStyles]}>
            <BackCard
              flashcard={flashcard}
              rotate={rotateFlashcard}
              nextCard={nextCard}
              index={index}
            />
          </Animated.View>
        </View>
        {/* <Animated.View
          style={[styles.answerOptions, answerOptionsAnimatedStyles]}
        >
          <ScoreBoard nextCard={nextCard} flashcard={flashcard} index={index} />
        </Animated.View> */}
      </Animated.View>
    </View>
  );
};

export default FlashcardCard;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: -CARD_WIDTH / 2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },

  frontCard: {
    position: "absolute",
    backfaceVisibility: "hidden",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  backCard: {
    backfaceVisibility: "hidden",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  answerOptions: {
    backfaceVisibility: "hidden",
  },
});
