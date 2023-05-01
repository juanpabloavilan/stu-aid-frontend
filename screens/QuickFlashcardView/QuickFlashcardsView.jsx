import StyledView from "../../styled_components/StyledView";
import TodaySessionContainer from "../../components/FlashcardsView/TodaySessionContainer";
import SubjectsNeedRevision from "../../components/FlashcardsView/SubjectsNeedRevision";
const QuickFlashcardsView = () => {
  return (
    <StyledView paddingDefault bgDefault main>
      <TodaySessionContainer />
      <SubjectsNeedRevision />
    </StyledView>
  );
};

export default QuickFlashcardsView;
