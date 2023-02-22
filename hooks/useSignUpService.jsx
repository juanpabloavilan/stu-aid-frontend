import Constants from "expo-constants";
import usePost from "./usePost";
import { useNavigation } from "@react-navigation/native";

const useSignUpService = () => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/users/`;
  const navigation = useNavigation();

  const { data, loading, error, execute, ref } = usePost({ url: API_URL });

  const fetchSignUp = async (payload) => {
    try {
      await execute(payload);
      if (error) return;
      setTimeout(() => {
        navigation.navigate("Login");
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, loading, error, fetchSignUp };
};

export default useSignUpService;
