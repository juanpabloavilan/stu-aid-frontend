import { FlatList } from "react-native";
import SubjectItem from "./SubjectItem";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";

const SubjectsList = ({ subjectsList }) => {
  if (subjectsList && subjectsList.length > 0) {
    return (
      <FlatList
        data={subjectsList}
        renderItem={({ item }) => <SubjectItem {...item} />}
        keyExtractor={(item) => item.id}
      />
    );
  } else {
    return (
      <StyledView>
        <StyledText bold h2 red>
          No tienes temas
        </StyledText>
      </StyledView>
    );
  }
};

export default SubjectsList;
