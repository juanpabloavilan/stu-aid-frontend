import { useContext, useEffect } from "react";
import usePost from "./usePost";
import Constants from "expo-constants";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const useLogInService = () => {
  const authStorage = useContext(AuthStorageContext);
  const API_URL = `${Constants.expoConfig.extra.apiURL}/auth/login`;
  const { loading, data, error, execute, ref } = usePost({ url: API_URL });
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !error) {
      onSuccessLogin();
    }
  }, [data, error, execute]);

  const onSuccessLogin = async () => {
    await authStorage.setAccessToken(data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    navigate("/home/courses");
  };

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
