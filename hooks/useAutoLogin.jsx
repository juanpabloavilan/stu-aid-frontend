import React, { useContext, useLayoutEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import useJwtLogInService from "./useJwtLogInService";

const useAutoLogin = () => {
  const authStorage = useContext(AuthStorageContext);
  const { loading, data, error, isAuthorized, jwtSignIn } =
    useJwtLogInService();

  useLayoutEffect(() => {
    const hasSessionSaved = async () => {
      //await authStorage.removeAccessToken();
      const accessToken = await authStorage.getAccessToken();
      console.log(accessToken);
      await jwtSignIn(accessToken);
    };
    //navigation.navigate("Login");
    hasSessionSaved();
  }, []);

  return { isAuthorized, loading };
};

export default useAutoLogin;
