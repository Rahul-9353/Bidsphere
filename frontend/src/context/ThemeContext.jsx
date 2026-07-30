import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    // light mode and dark mode
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('bidsphere-theme');
        if (stored) {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('bidsphere-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
   </ThemeContext.Provider>
  );
}

export function useTheme() {
    return useContext(ThemeContext);
}
