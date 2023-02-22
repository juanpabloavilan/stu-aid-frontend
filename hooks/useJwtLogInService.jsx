import { useEffect, useContext, useState } from "react";
import usePost from "./usePost";
import Constants from "expo-constants";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const useJwtLogInService = () => {
  const URL = `${Constants.expoConfig.extra.apiURL}/auth/jwt-login`;
  const { loading, data, error, execute } = usePost({ url: URL });
  const navigation = useNavigation();
  const authStorage = useContext(AuthStorageContext);

  useEffect(() => {
    if (data && !error) {
      onSuccessLogin();
    }
    if (error) {
      onFailedLogin();
    }
  }, [data, error, execute]);

  const jwtSignIn = async (accessToken) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      await execute({ accessToken });
    } catch (error) {
      console.log(error);
    }
  };
  const onSuccessLogin = async () => {
    const token = await authStorage.getAccessToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    navigation.navigate("Courses");
    console.log("going to Courses");
  };

  const onFailedLogin = async () => {
    await authStorage.removeAccessToken();
    delete axios.defaults.headers.common["Authorization"];
    navigation.navigate("Login");
    console.log("Going to login");
  };
  return { loading, data, error, jwtSignIn };
};

export default useJwtLogInService;
