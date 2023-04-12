import Constants from "expo-constants";
import usePost from "./usePost";

const usePostFlashcards = (courseId, subjectId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}/subjects/${subjectId}/flashcards`;
  const { data, loading, error, execute } = usePost({ url: API_URL });
  return { data, loading, error, execute };
};

export default usePostFlashcards;
