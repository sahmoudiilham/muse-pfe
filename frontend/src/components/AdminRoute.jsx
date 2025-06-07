import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
};

export default AdminRoute;
