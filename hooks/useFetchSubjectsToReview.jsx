import Constants from "expo-constants";
import useGet from "./useGet";
import { useEffect } from "react";

const useFetchSubjectsToReview = (courseId, subjectId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/study-session/subjects-to-review`;
  const { loading, error, data, execute } = useGet({ url: API_URL });
  useEffect(() => {
    execute();
  }, []);

  return { loading, error, data, execute };
};

export default useFetchSubjectsToReview;
