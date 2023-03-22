import Constants from "expo-constants";
import useGet from "./useGet";
import { useEffect } from "react";

const useFetchSubject = (courseId, subjectId) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}/subjects/${subjectId}`;
  const { loading, error, data, execute } = useGet({ url: API_URL });
  useEffect(() => {
    execute();
  }, []);

  return { loading, error, data, execute };
};

export default useFetchSubject;
