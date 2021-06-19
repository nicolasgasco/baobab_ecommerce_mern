import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig, applyData, handleError) => {
      setIsLoading(true);
      setError(null);
      console.log("started http");

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (err) {
        console.log(err.message);
        if (handleError) handleError();
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
    setIsLoading,
  };
};

export default useHttp;
