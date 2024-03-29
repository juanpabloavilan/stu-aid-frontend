import { useContext, useEffect } from "react";
import usePost from "./usePost";
import Constants from "expo-constants";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const useLogInService = () => {
  const authStorage = useContext(AuthStorageContext);
  const API_URL = `${Constants.expoConfig.extra.apiURL}/auth/login`;
  const { loading, data, error, execute } = usePost({ url: API_URL });
  const navigation = useNavigation();

  useEffect(() => {
    if (data && !error) {
      onSuccessLogin();
    }
  }, [data, error, execute]);

  const onSuccessLogin = async () => {
    await authStorage.setAccessToken(data.token);
    await authStorage.setUserInfo(data.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    navigation.navigate("Home");
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
