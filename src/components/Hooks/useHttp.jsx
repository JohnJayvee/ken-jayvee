import axios from "axios";
import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  try {
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong, failed to send request.";
    throw new Error(errorMessage);
  }
}

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // start fetching
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false); //end the request after
    },
    [url, config]
  );

  // this method will check conditionally before sending request if CONFIG is set or not and if only method request is GET
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      // if config is truthy and if it is SET at all
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
