import Constants from "expo-constants";
import { useContext, useEffect } from "react";
import { AuthStorageContext } from "../contexts/AuthStorageContext";
import useGet from "./useGet";
import { useState } from "react";
import { useNavigate } from "react-router-native";

/**
 * TODO:
 * 3. Work on the course view styling
 * 4. Boton de agregar clase
 * 5. Boton de eliminar clase + modal de confirmación.
 * 6. Botón de repasar clase
 * 7. Implementar Error Boundary https://carloscuesta.me/blog/managing-react-native-crashes-with-error-boundaries
 * 8. Implementar modal view ver: https://www.youtube.com/watch?v=10igt6r0Cso
 */
const useFetchCourses = () => {
  const navigate = useNavigate();
  const authStorage = useContext(AuthStorageContext);
  const API_URL = `${Constants.expoConfig.extra.apiURL}/courses`;
  const { loading, error, data } = useGet({
    url: API_URL,
    headers: { "Content-Type": "application/json" },
  });

  if (error) {
    authStorage
      .removeAccessToken()
      .then(() => {
        console.log("access token removed");
      })
      .catch((e) => {
        console.log("Error", e);
      })
      .finally(() => {
        navigate("/");
      });
  }
  return { loading, error, data };
};

export default useFetchCourses;
