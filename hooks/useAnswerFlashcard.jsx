import Constants from "expo-constants";
import usePut from "./usePut";

const useAnswerFlashcard = (courseId, subjectId, flashcardId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}/subjects/${subjectId}/flashcards/answer/${flashcardId}`;
  const { data, loading, error, execute } = usePut({ url: API_URL });
  return { data, loading, error, execute };
};

export default useAnswerFlashcard;
