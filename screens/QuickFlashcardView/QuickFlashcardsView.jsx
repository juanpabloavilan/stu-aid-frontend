import { View } from "react-native";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import { ScrollView } from "react-native-gesture-handler";
import TodaySessionContainer from "../../components/FlashcardsView/TodaySessionContainer";
import SubjectsNeedRevision from "../../components/FlashcardsView/SubjectsNeedRevision";
const QuickFlashcardsView = () => {
  return (
    <StyledView paddingDefault bgDefault main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TodaySessionContainer />
        <SubjectsNeedRevision />
      </ScrollView>
    </StyledView>
  );
};

export default QuickFlashcardsView;
