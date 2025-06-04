import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.scss'; // Nous allons créer ce fichier SCSS

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="profile-loading">Chargement du profil ou non connecté...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon Profil</h1>
      <div className="profile-details">
        <p><strong>Nom:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Ajoutez d'autres informations si disponibles dans l'objet user, ex: */}
        {/* <p><strong>Morphologie:</strong> {user.morphology?.name || 'Non renseignée'}</p> */}
        {/* <p><strong>Palette:</strong> {user.palette?.name || 'Non renseignée'}</p> */}
        <p><strong>Membre depuis:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      {/* Vous pouvez ajouter des boutons ici pour modifier le profil, changer le mot de passe, etc. */}
      {/* <button className="edit-profile-btn">Modifier le profil</button> */}
    </div>
  );
};

export default Profile;