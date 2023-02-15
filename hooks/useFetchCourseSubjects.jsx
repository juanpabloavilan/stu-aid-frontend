import useGet from "./useGet";
import Constants from "expo-constants";

const useFetchCourseSubjects = (courseId) => {
  const URL = `${Constants.expoConfig.extra.apiURL}/courses/${courseId}`;
  const { loading, error, data } = useGet({ url: URL });
};

export default useFetchCourseSubjects;
