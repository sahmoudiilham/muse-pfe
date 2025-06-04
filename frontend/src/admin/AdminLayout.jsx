// AdminLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <nav>
        <NavLink to="users">Utilisateurs</NavLink>
        <NavLink to="favoris">Favoris</NavLink>
        <NavLink to="palettes">Palettes</NavLink>
        <NavLink to="morphologies">Morphologies</NavLink>
        <NavLink to="stats">Statistiques</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}