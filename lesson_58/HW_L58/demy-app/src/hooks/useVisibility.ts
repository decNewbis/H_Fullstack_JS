import { useState, useEffect } from "react";
import {Keys} from "../constants";

type UseVisibilityResult = [boolean, () => void];

export function useVisibility(key: Keys, initValue: boolean): UseVisibilityResult {
  const getInitSate = (): boolean => {
    const savedSate: string | null = localStorage.getItem(key);
    if (savedSate === null) {
      return initValue;
    } else {
      return JSON.parse(savedSate);
    }
  }
  const [isVisible, setIsVisible] = useState(getInitSate);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isVisible));
  }, [isVisible, key]);
  const toggleVisibility = () => {
    setIsVisible((prevState: boolean) => !prevState);
  }
  return [isVisible, toggleVisibility];
}