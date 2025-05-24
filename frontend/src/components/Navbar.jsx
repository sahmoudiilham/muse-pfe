import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Muse</Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/morphologie">Morphologie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coiffure">Coiffure</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lunettes">Lunettes</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
