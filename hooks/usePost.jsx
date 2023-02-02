import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const usePost = ({ url, headers }) => {
  const postDataRef = useRef({
    loading: false,
    data: null,
    error: null,
  });
  const [postData, setPostData] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const execute = useCallback(
    async (payload) => {
      setPostData((prevState) => {
        return {
          loading: true,
          ...prevState,
        };
      });

      postDataRef.current = { ...postDataRef.current, loading: false };

      try {
        const response = await axios.post(url, payload, {
          crossdomain: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setPostData((prevState) => ({
          loading: false,
          data: response.data,
          error: null,
        }));
        postDataRef.current = {
          loading: false,
          data: response.data,
          error: null,
        };
      } catch (error) {
        console.log(error);
        setPostData((prevState) => ({
          loading: false,
          data: null,
          error: error.response.data.message || error.message,
        }));
        postDataRef.current = {
          loading: false,
          data: null,
          error: error.response.data.message || error.message,
        };
      } finally {
        console.log("finalizooo post hook con", postDataRef.current);
      }
      // axios
      //   .post(url, payload, {
      //     crossdomain: true,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then((response) => {
      //     setPostData((prevState) => ({
      //       loading: false,
      //       data: response.data,
      //       error: null,
      //     }));
      //     postDataRef.current = {
      //       loading: false,
      //       data: response.data,
      //       error: null,
      //     };
      //   })
      // .catch((error) => {
      //   console.log(error);
      //   setPostData((prevState) => ({
      //     loading: false,
      //     data: null,
      //     error: error.response.data.message || error.message,
      //   }));
      //   postDataRef.current = {
      //     loading: false,
      //     data: null,
      //     error: error.response.data.message || error.message,
      //   };
      // })
      // .finally(() => {
      //   console.log("finalizooo post hook con", postDataRef.current);
      // });
    },
    [url, headers]
  );

  return { ...postData, execute, ref: postDataRef.current };
};
export default usePost;
