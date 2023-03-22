import Constants from "expo-constants";
import usePost from "./usePost";

const usePostSubjectFlashcards = (courseId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}/subjects`;
  const { data, error, loading, execute } = usePost({ url: API_URL });

  return { data, error, loading, execute };
};

export default usePostSubjectFlashcards;
