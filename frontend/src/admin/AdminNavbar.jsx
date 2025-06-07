import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";




const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
   <nav className="admin-navbar">
  <div className="logo">Admin Panel</div>
  <ul className="nav-links">
    <li><Link to="/admin/stats">Dashboard</Link></li>
    <li><Link to="/admin/users">Users</Link></li>
    <li><Link to="/admin/palettes">Palettes</Link></li>
    <li><Link to="/admin/morphologies">Morphologies</Link></li>
    <li><Link to="/admin/favoris">Favoris</Link></li>
  </ul>
  <button onClick={logout} className="logout-btn">Logout</button>
</nav>
  );
};

export default AdminNavbar;
