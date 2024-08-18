import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch {
        setError(error.message || "Something went wrong!");
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
