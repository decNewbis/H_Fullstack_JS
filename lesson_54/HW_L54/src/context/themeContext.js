import {createContext, useContext, useState} from 'react';
import { THEME } from "../constants";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || THEME.DARK);
  const changeTheme = (newTheme) => {
    const updatedTheme = newTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme: changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}