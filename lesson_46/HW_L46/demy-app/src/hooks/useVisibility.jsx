import { useState, useEffect } from "react";

export function useVisibility(key, initValue) {
  const getInitSate = () => {
    const savedSate = JSON.parse(localStorage.getItem(key));
    if (savedSate === null) {
      return initValue;
    } else {
      return savedSate;
    }
  }
  const [isVisible, setIsVisible] = useState(getInitSate);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isVisible));
  }, [isVisible, key]);
  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  }
  return [isVisible, toggleVisibility];
}