import usePost from "./usePost";
import Constants from "expo-constants";
import { useNavigate } from "react-router-native";

const useLogInService = () => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/auth/login`;
  const { loading, data, error, execute } = usePost({ url: API_URL });

  const fetchSignIn = async ({ email, password }) => {
    try {
      await execute({ email, password });
    } catch (error) {
      console.error(error);
    }
  };
  return { loading, data, error, fetchSignIn };
};

export default useLogInService;
