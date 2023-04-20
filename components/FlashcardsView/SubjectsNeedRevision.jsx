import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "../../styled_components/StyledText";
import StyledView from "../../styled_components/StyledView";
import useFetchSubjectsToReview from "../../hooks/useFetchSubjectsToReview";
import LoadingSpinner from "../LoadingSpinner";
import SubjectToReviewItem from "../StudySession/SubjectToReviewItem";

const SubjectsNeedRevision = () => {
  const { loading, error, data, execute } = useFetchSubjectsToReview();

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <StyledView style={{ marginBottom: 12 }}>
            <StyledText bold h4>
              Temas que necesitas estudiar
            </StyledText>
          </StyledView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <StyledView>
                <StyledText bold gray>
                  No tienes temas para repasar
                </StyledText>
              </StyledView>
            }
            data={data?.subjects}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => <SubjectToReviewItem {...item} />}
          />
        </>
      )}
      {error && <StyledText>{error.message}</StyledText>}
    </>
  );
};

export default SubjectsNeedRevision;

const styles = StyleSheet.create({});
