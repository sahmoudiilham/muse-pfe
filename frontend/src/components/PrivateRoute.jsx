import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) return <div>Chargement...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
