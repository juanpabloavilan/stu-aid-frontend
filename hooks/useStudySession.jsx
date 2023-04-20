import Constants from "expo-constants";
import useGet from "./useGet";
import { useEffect } from "react";

const useStudySession = (options) => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/study-session/today`;
  const { loading, error, data, execute } = useGet({
    url: API_URL,
    params: options,
  });

  useEffect(() => {
    execute();
  }, []);

  return { loading, error, data, execute };
};

export default useStudySession;
