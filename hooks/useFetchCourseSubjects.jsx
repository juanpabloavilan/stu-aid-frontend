import useGet from "./useGet";
import Constants from "expo-constants";

const useFetchCourseSubjects = (courseId) => {
  const URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}`;
  const { loading, error, data } = useGet({
    url: URL,
    headers: { "Content-Type": "application/json" },
  });
  return { loading, error, data };
};

export default useFetchCourseSubjects;
