import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Muse</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/morphologie">Morphologie</Link></li>
        <li><Link to="/palette">Palette</Link></li>
        <li><Link to="/vetement">Vêtements</Link></li>
        <li><Link to="/coiffure">Coiffure</Link></li>
        <li><Link to="/lunette">Lunettes</Link></li>
        <li><Link to="/visage">Visage</Link></li>
        <li><Link to="/favoris">Favoris</Link></li>
        <li><Link to="/chat">Chat IA</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
