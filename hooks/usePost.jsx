import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const usePost = ({ url, headers }) => {
  const [postData, setPostData] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (isExecuting) {
      console.log(postData, url);
    }
  }, [postData]);

  const execute = useCallback(
    async (payload) => {
      setIsExecuting(true);
      setPostData((prevState) => {
        return {
          loading: true,
          ...prevState,
        };
      });

      try {
        console.log(url, payload);
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
      } catch (error) {
        console.log(error);
        setPostData((prevState) => ({
          loading: false,
          data: null,
          error: error.response?.data?.message || error.message,
        }));
      } finally {
        setIsExecuting(false);
      }
    },
    [url, headers]
  );

  return { ...postData, execute };
};
export default usePost;
