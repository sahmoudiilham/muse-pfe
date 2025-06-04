import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/admin/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Charger tous les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      setUsers(res.data);
    } catch (e) {
      alert("Erreur lors du chargement des utilisateurs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Voir détails utilisateur (chargement API)
  const handleDetails = async (user) => {
    setSelected(user);
    setLoadingDetails(true);
    try {
      const res = await axios.get(`${API_URL}/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      setSelectedDetails(res.data);
    } catch (e) {
      alert("Erreur lors du chargement des détails");
      setSelectedDetails(null);
    }
    setLoadingDetails(false);
  };

  // Supprimer utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      setUsers(users.filter(u => u.id !== id));
      if (selected && selected.id === id) setSelected(null);
    } catch (e) {
      alert("Erreur lors de la suppression");
    }
  };

  // Changer le rôle
  const handleToggleRole = async (user) => {
    try {
      await axios.patch(`${API_URL}/${user.id}/role`, {
        role: user.role === "admin" ? "user" : "admin"
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      fetchUsers();
    } catch (e) {
      alert("Erreur lors du changement de rôle");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Utilisateurs</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email}) - {u.role}
            <button onClick={() => handleDetails(u)}>Détails</button>
            <button onClick={() => handleDelete(u.id)}>Supprimer</button>
            <button onClick={() => handleToggleRole(u)}>
              {u.role === "admin" ? "Retirer admin" : "Donner admin"}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div style={{ border: "1px solid #ccc", marginTop: 20, padding: 10 }}>
          <h3>Détails de {selected.name}</h3>
          {loadingDetails ? (
            <div>Chargement des détails...</div>
          ) : selectedDetails ? (
            <>
              <p>Email: {selectedDetails.email}</p>
              <p>Rôle: {selectedDetails.role}</p>
              <h4>Favoris :</h4>
              <ul>
                {selectedDetails.favoris && selectedDetails.favoris.length > 0 ? (
                  selectedDetails.favoris.map(fav => (
                    <li key={fav.id}>
                      {fav.vetement ? fav.vetement.name : "Vêtement supprimé"}
                    </li>
                  ))
                ) : (
                  <li>Aucun favori</li>
                )}
              </ul>
              <h4>Morphologie :</h4>
              <p>
                {selectedDetails.morphology
                  ? selectedDetails.morphology.name
                  : "Non renseignée"}
              </p>
              <h4>Vêtements favoris :</h4>
              <ul>
                {selectedDetails.favoris && selectedDetails.favoris.length > 0 ? (
                  selectedDetails.favoris.map(fav => (
                    <li key={fav.id}>
                      {fav.vetement ? fav.vetement.name : "Vêtement supprimé"}
                    </li>
                  ))
                ) : (
                  <li>Aucun vêtement favori</li>
                )}
              </ul>
            </>
          ) : (
            <div>Erreur lors du chargement des détails.</div>
          )}
          <button onClick={() => { setSelected(null); setSelectedDetails(null); }}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default Users;