import { Link, NavLink, useNavigate } from "react-router-dom";
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
            {[
              "morphologie",
              "palette",
              "vetements",
              "coiffure",
              "lunette",
              "visage",
              "favoris",
              "chat",
            ].map((path) => (
              <li key={path}>
                <NavLink
  to={`/${path}`}
  className={({ isActive }) => (isActive ? "active" : "")}
  onClick={() => {
    if (path === "vetements") {
      localStorage.removeItem("selectedMorpho"); // هاهنا نحيدو morpho من التخزين
    }
  }}
>
  {path.charAt(0).toUpperCase() + path.slice(1)}
</NavLink>
  
              </li>
            ))}
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
