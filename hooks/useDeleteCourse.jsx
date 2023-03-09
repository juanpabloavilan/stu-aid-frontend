import Constants from "expo-constants";
import { useDelete } from "./useDelete";

const useDeleteCourse = (id) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses/${id}`;
  const { data, loading, error, execute } = useDelete({ url: API_URL });
  return { data, loading, error, execute };
};

export default useDeleteCourse;
