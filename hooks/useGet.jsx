import React, { useEffect, useState } from "react";
import axios from "axios";

const useGet = ({ url, headers, params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    execute();
  }, []);

  const execute = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {
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
  };

  return { loading, error, data };
};

export default useGet;
