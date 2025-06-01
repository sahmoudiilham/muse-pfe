// src/utils/auth.js

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken(); // true si token existe
};
