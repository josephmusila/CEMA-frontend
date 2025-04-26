import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [id, setId] = useState(localStorage.getItem('id') || null);
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('id',id);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }
  }, [token]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AuthContext.Provider value={{ token, setToken,id,setId, themeMode, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};