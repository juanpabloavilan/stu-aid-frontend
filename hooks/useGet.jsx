import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useGet = ({ url, headers, params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (isExecuting) {
      console.log({ data, loading, error });
    }
  }, [data, loading, error]);

  const execute = useCallback(async () => {
    console.log("executing fun");
    setIsExecuting(true);
    setLoading(true);
    try {
      const response = await axios.get(url, {
        crossdomain: true,
        params,
        headers,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setData(null);
      setError(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
    setIsExecuting(false);
  }, [url, headers, params]);

  return { loading, error, data, execute };
};

export default useGet;
