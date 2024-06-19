import { useState, useEffect } from "react";

export function useGetDataFromUrl(url) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData(handlerSuccess, handlerError, url) {
      try {
        const data = await fetch(url);
        const response = await data.json();
        handlerSuccess(response);
      } catch (err) {
        handlerError(err);
      }
    }
    getData(setUsers, setError, url);
  }, [url]);

  return [users, error];
}