import Constants from "expo-constants";
import { useDelete } from "./useDelete";

const useDeleteFlashcard = (flashcardId, subjectId, courseId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}/subjects/${subjectId}/flashcards/${flashcardId}`;
  console.log(API_URL);
  const { data, loading, error, execute } = useDelete({ url: API_URL });
  return { data, loading, error, execute };
};

export default useDeleteFlashcard;
