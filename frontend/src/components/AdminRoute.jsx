import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loadingAuth } = useAuth();
  if (loadingAuth) return <div>Chargement...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/login" />;
  return children;
};

export default AdminRoute;