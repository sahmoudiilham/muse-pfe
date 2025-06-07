import { Link } from "react-router-dom";
import "../styles/AdminNavbar.scss";

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <ul>
                <li>
                    <Link to="/admin/stats">Statistiques</Link></li>
                <li>
                    <Link to="/admin/users">Utilisateurs</Link></li>
                <li>
                    <Link to="/admin/morphologies">Morphologies</Link></li>
                <li>
                    <Link to="/admin/palettes">Palettes</Link></li>
                <li>
                    <Link to="/admin/favoris">Favoris</Link></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
