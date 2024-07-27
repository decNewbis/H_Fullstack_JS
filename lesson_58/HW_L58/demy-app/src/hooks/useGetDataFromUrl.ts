import { useState, useEffect } from "react";

interface SetUsers {
  [key: string]: string;
}
type handlerSuccess = (response: SetUsers[]) => void;
type handlerError = (error: string) => void;
type UseGetDataFromUrlResult = [SetUsers[], string, boolean];

export function useGetDataFromUrl(url: string): UseGetDataFromUrlResult {
  const [users, setUsers] = useState<SetUsers[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData(handlerSuccess: handlerSuccess, handlerError: handlerError, url: string) {
      try {
        const data = await fetch(url);
        const response = await data.json();
        handlerSuccess(response);
      } catch (err) {
        handlerError(err instanceof Error ? err.message : "unknown error");
      } finally {
        setIsLoading(false);
      }
    }
    getData(setUsers, setError, url);
  }, [url]);
  return [users, error, isLoading];
}