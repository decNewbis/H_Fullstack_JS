import { useState, useEffect } from "react";

export function useGetDataFromUrl(url) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData(handlerSuccess, handlerError, url) {
      try {
        const data = await fetch(url);
        const response = await data.json();
        handlerSuccess(response);
      } catch (err) {
        handlerError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getData(setUsers, setError, url);
  }, [url]);
  return [users, error, isLoading];
}