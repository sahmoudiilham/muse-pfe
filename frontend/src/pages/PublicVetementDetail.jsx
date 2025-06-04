// src/pages/PublicVetementDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/publicVetementDetail.scss'; // Nouveau fichier SCSS

const PublicVetementDetail = () => {
  const { id } = useParams();
  const [vetement, setVetement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVetement = async () => {
      try {
        // Pas besoin d'authentification pour cette route API
        const response = await axios.get(`http://localhost:8000/api/vetements/${id}`);
        setVetement(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du vêtement:", err);
        setError("Impossible de charger les détails du vêtement.");
        setLoading(false);
      }
    };
    fetchVetement();
  }, [id]);

  if (loading) return <p className="public-detail-message">Chargement du vêtement...</p>;
  if (error) return <p className="public-detail-message error-message">{error}</p>;
  if (!vetement) return <p className="public-detail-message">Vêtement non trouvé.</p>;

  return (
    <div className="public-vetement-detail-container">
      <h1 className="vetement-name-public">{vetement.name}</h1>
      <img
        src={`http://localhost:8000/storage/${vetement.image}`}
        alt={vetement.name}
        className="vetement-image-public"
      />
      {vetement.morphology && (
        <p className="vetement-category-public">
          Catégorie: <strong>{vetement.morphology.name}</strong>
        </p>
      )}
      {/* Ajoutez d'autres détails du vêtement si vous en avez */}
      {/* <p className="vetement-description-public">{vetement.description}</p> */}
    </div>
  );
};

export default PublicVetementDetail;