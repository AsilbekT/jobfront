import { useCallback } from "react";
import { useState } from "react";
import { fetchWithAuth } from "../utils/fetch.util";

export const useFetch = (initiallyLoading = true) => {
  const [loading, setLoading] = useState(initiallyLoading);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(
    async (reqInit, reqBody, noStateSave) => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetchWithAuth(reqInit, reqBody);
        const data = await response.json();
        if (response.ok) {
          if (!noStateSave) setData(data);
          return data;
        }
        return null;
      } catch (er) {
        console.log(er);
        setError(er);
        return null;
      } finally {
        setLoading(false);
      }
    }, []
  );

  return {
    makeRequest,
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
  };
};