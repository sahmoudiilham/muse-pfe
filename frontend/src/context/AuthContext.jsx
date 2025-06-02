// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User state: true if token in localStorage, else false
  const [user, setUser] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
