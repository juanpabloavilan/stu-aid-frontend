import Constants from "expo-constants";
import usePut from "./usePut";

const usePutCourse = (id) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${id}`;
  const { loading, data, error, execute } = usePut({ url: API_URL });

  const putCourse = async (payload) => {
    await execute(payload);
  };

  return { loading, data, error, putCourse };
};

export default usePutCourse;
