import Constants from "expo-constants";
import usePost from "./usePost";
import { useNavigate } from "react-router-native";

const useSignUpService = () => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/users/`;
  const navigate = useNavigate();

  const { data, loading, error, execute, ref } = usePost({ url: API_URL });

  const fetchSignUp = async (payload) => {
    try {
      await execute(payload);
      if (error) return;
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, loading, error, fetchSignUp };
};

export default useSignUpService;
