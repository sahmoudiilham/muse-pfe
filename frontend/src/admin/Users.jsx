import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Users.scss';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token);

      const res = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("authToken");

  axios.get("http://localhost:8000/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  })
  .then(res => {
    console.log("Utilisateur connecté :", res.data);
  })
  .catch(err => {
    console.error("Erreur /me :", err);
  });
}, []);

  return (
    <div className="users-page">
      <h2>Liste des utilisateurs</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Morphologie</th>
            <th>Palette</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.morphology?.name || '—'}</td>
              <td>{user.palette?.skin_tone || '—'}</td>
              <td>
                <button onClick={() => deleteUser(user.id)} className="delete-btn">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
