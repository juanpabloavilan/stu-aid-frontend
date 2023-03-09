import Constants from "expo-constants";
import { useContext, useEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import useGet from "./useGet";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const useFetchCourses = () => {
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses`;
  const { loading, error, data, execute } = useGet({
    url: API_URL,
    headers: { "Content-Type": "application/json" },
  });

  const fetchCourses = async () => {
    console.log("Executing useFetchCourses");
    await execute();
  };

  return { loading, error, data, fetchCourses };
};

export default useFetchCourses;
