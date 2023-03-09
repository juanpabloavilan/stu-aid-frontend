import Constants from "expo-constants";
import usePost from "./usePost";

const usePostSubjectFlashcards = () => {
  const API_URL = `${Constants.expoConfig.extra.apiUrl}/subjects`;
  const { data, error, loading, execute } = usePost({ url: API_URL });

  return { data, error, loading, execute };
};

export default usePostSubjectFlashcards;
