import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">Muse</Link>
      </div>
      <ul className="nav-links">
        {user ? (
          <>
            <li><Link to="/morphologie">Morphologie</Link></li>
            <li><Link to="/palette">Palette</Link></li>
            <li><Link to="/vetements">Vêtements</Link></li>
            <li><Link to="/coiffure">Coiffure</Link></li>
            <li><Link to="/lunette">Lunettes</Link></li>
            <li><Link to="/visage">Visage</Link></li>
            <li><Link to="/favoris">Favoris</Link></li>
            <li><Link to="/chat">Chat IA</Link></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
