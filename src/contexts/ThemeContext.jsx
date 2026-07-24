import { createContext, useContext, useEffect, useState } from 'react';

const THEME_KEY = 'beanybundle-theme';
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
