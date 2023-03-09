import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export const useDelete = ({ url, headers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (hasFinished) {
      console.log({ loading, data, error, url });
    }
  }, [loading, data, error]);

  const execute = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.delete(url, {
        crossdomain: true,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
      setData(response);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
      setHasFinished(true);
    }
  }, [url, headers]);

  return { loading, data, error, execute };
};
