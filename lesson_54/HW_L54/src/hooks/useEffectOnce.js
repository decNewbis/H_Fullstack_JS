import { useEffect } from "react";

export function useEffectOnce({callback}) {
  useEffect(() => {
    callback()
  }, []);
}