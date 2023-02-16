import React from "react";
import StyledView from "../styled_components/StyledView";
import { ScrollView } from "react-native";
import StyledText from "../styled_components/StyledText";

const CourseDetailsView = () => {
  return (
    <StyledView>
      <ScrollView>
        <StyledText bold h2>
          Course Details View
        </StyledText>
      </ScrollView>
    </StyledView>
  );
};

export default CourseDetailsView;
