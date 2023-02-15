import { View } from "react-native";
import StyledText from "../styled_components/StyledText";
import StyledView from "../styled_components/StyledView";

const QuickFlashcardsView = () => {
  return (
    <StyledView justifyCenter alignCenter>
      <StyledText h1 bold blue>
        Flashcards View
      </StyledText>
    </StyledView>
  );
};

export default QuickFlashcardsView;
