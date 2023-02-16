import { useEffect, useContext, useState } from "react";
import usePost from "./usePost";
import Constants from "expo-constants";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";
import axios from "axios";

const useJwtLogInService = () => {
  const URL = `${Constants.expoConfig.extra.apiURL}/auth/jwt-login`;
  const { loading, data, error, execute } = usePost({ url: URL });
  const navigate = useNavigate();
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
    navigate("/home/courses");
  };

  const onFailedLogin = async () => {
    await authStorage.removeAccessToken();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };
  return { loading, data, error, jwtSignIn };
};

export default useJwtLogInService;
