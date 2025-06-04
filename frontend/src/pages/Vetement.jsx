import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import des icônes de cœur
import "../styles/vetement.scss";

const Vetements = () => {
  const [vetements, setVetements] = useState([]);
  const [filteredVetements, setFilteredVetements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(() => {
    return localStorage.getItem("selectedMorpho") !== null;
  });
  const [favoriteVetementIds, setFavoriteVetementIds] = useState(new Set());

  // REMPLACEZ PAR VOTRE VRAIE LOGIQUE D'AUTHENTIFICATION ET DE RÉCUPÉRATION DU TOKEN
  // Par exemple, si vous stockez le token dans localStorage après la connexion:
  const authToken = localStorage.getItem('authToken'); // Assurez-vous que c'est le bon nom de clé
  // Si votre système gère l'ID utilisateur côté client (moins sécurisé sans vérification serveur)
  // const userId = localStorage.getItem('userId');

  // Fonction pour récupérer les favoris de l'utilisateur authentifié
  const fetchFavorites = async () => {
    if (!authToken) {
      console.warn("Aucun token d'authentification trouvé. Impossible de charger les favoris.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:8000/api/favoris", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const ids = new Set(response.data.map((fav) => fav.vetement_id));
      setFavoriteVetementIds(ids);
    } catch (error) {
      console.error("Erreur lors du chargement des favoris:", error);
      // Gérer l'erreur (ex: utilisateur non authentifié, token invalide)
      if (error.response && error.response.status === 401) {
          console.error("Veuillez vous authentifier pour voir vos favoris.");
          // Rediriger vers la page de connexion ou afficher un message approprié
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/vetements")
      .then((res) => {
        setVetements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement vetements:", err);
        setLoading(false);
      });

    fetchFavorites(); // Récupérer les favoris au chargement de la page
  }, [authToken]); // Recharger si le token change (ex: après connexion/déconnexion)

  useEffect(() => {
    const selectedMorpho = localStorage.getItem("selectedMorpho");
    if (selectedMorpho) {
      const filtered = vetements.filter(
        (v) => v.morphology && v.morphology.name === selectedMorpho
      );
      setFilteredVetements(filtered);
      setFilterActive(true);
    } else {
      setFilteredVetements(vetements);
      setFilterActive(false);
    }
  }, [vetements]);

  const clearFilter = () => {
    localStorage.removeItem("selectedMorpho");
    setFilteredVetements(vetements);
    setFilterActive(false);
  };

  const handleToggleFavorite = async (vetementId) => {
    if (!authToken) {
        alert("Veuillez vous connecter pour gérer vos favoris.");
        // Rediriger vers la page de connexion si vous avez une route d'authentification
        return;
    }

    const isCurrentlyFavorite = favoriteVetementIds.has(vetementId);
    
    try {
      if (isCurrentlyFavorite) {
        // Supprimer des favoris
        await axios.delete(`http://localhost:8000/api/favoris/${vetementId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setFavoriteVetementIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(vetementId);
          return newSet;
        });
      } else {
        // Ajouter aux favoris
        await axios.post("http://localhost:8000/api/favoris", { vetement_id: vetementId }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setFavoriteVetementIds((prev) => new Set(prev).add(vetementId));
      }
    } catch (error) {
      console.error("Erreur lors de la gestion des favoris:", error);
      alert("Une erreur est survenue lors de la mise à jour des favoris.");
      // Gérer spécifiquement les erreurs (ex: 401 Unauthorized)
      if (error.response && error.response.status === 401) {
          alert("Votre session a expiré ou vous n'êtes pas autorisé. Veuillez vous reconnecter.");
          // Rediriger vers la page de connexion
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  if (filteredVetements.length === 0)
    return <p>Aucun vêtement disponible pour cette morphologie.</p>;

  return (
    <div className="vetements-container">
      <h1>
        Vêtements{" "}
        {filterActive
          ? `pour la morphologie ${localStorage.getItem("selectedMorpho")}`
          : "disponibles"}
      </h1>

      {filterActive && (
        <button onClick={clearFilter}>Voir tous les vêtements</button>
      )}

      <div className="vetements-grid">
        {filteredVetements.map((v) => (
          <div className="vetement-card" key={v.id}>
            <img
              src={`http://localhost:8000/storage/${v.image}`}
              alt={v.name}
            />
            
            {/* Icône de like/dislike professionnelle */}
            <span
              className="favorite-icon"
              onClick={() => handleToggleFavorite(v.id)}
            >
              {favoriteVetementIds.has(v.id) ? (
                <FaHeart className="heart-filled" /> // Cœur rempli si déjà en favori
              ) : (
                <FaRegHeart className="heart-empty" /> // Cœur vide sinon
              )}
            </span>

            <h2>{v.name}</h2>
            {/* Si vous avez une description, l'afficher ici */}
            {/* <p>{v.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vetements;