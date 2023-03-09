import Constants from "expo-constants";
import usePost from "./usePost";

const usePostCourse = () => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses`;
  const { loading, error, data, execute } = usePost({ url: API_URL });

  const postCourse = async (payload) => {
    try {
      await execute(payload);
    } catch (error) {
      console.log(err);
    }
  };
  return { loading, error, data, postCourse };
};

export default usePostCourse;
