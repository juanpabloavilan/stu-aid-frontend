import axios from "axios";
import { useState, useCallback, useEffect } from "react";

const usePut = ({ url, header }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (isExecuting) {
      console.log({ data, loading, error });
    }
  }, [data, loading, error]);

  const execute = useCallback(
    async (payload) => {
      setLoading(true);
      setIsExecuting(true);
      try {
        const response = await axios.put(url, payload, {
          crossdomain: true,
          headers: {
            "Content-Type": "application/json",
            ...header,
          },
        });
        setData(response);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
      setIsExecuting(false);
    },
    [url, header]
  );

  return { data, loading, error, execute };
};

export default usePut;
