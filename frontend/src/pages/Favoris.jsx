import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaShareAlt } from "react-icons/fa"; // Icônes pour supprimer et partager
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share"; // Importez les composants de partage
import "../styles/favoris.scss";

const Favoris = () => {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState(""); // État pour le lien à partager
  const [showShareOptions, setShowShareOptions] = useState(null); // Gère l'affichage des options de partage pour un favori donné

  const authToken = localStorage.getItem("authToken");

  const fetchFavoris = async () => {
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
      setFavoris(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des favoris:", error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        console.error("Veuillez vous authentifier pour voir vos favoris.");
      }
    }
  };

  useEffect(() => {
    fetchFavoris();
  }, [authToken]);

  const removeFavori = async (vetementId) => {
    if (!authToken) {
      alert("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/favoris/${vetementId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setFavoris((prevFavoris) =>
        prevFavoris.filter((item) => item.vetement_id !== vetementId)
      );
      alert("Article retiré des favoris.");
    } catch (error) {
      console.error("Erreur lors de la suppression du favori:", error);
      alert("Une erreur est survenue lors de la suppression du favori.");
      if (error.response && error.response.status === 401) {
        alert("Votre session a expiré ou vous n'êtes pas autorisé. Veuillez vous reconnecter.");
      }
    }
  };

  // Nouvelle fonction pour générer le lien de partage
  const handleShareClick = async (vetementId) => {
    // Si les options sont déjà affichées pour cet article, cachez-les
    if (showShareOptions === vetementId) {
      setShowShareOptions(null);
      setShareUrl("");
      return;
    }

    try {
      // Appel à votre nouvelle API Laravel pour obtenir le lien partageable
      const response = await axios.get(`http://localhost:8000/api/share/vetement/${vetementId}`);
      setShareUrl(response.data.share_url);
      setShowShareOptions(vetementId); // Affiche les options pour cet ID
    } catch (error) {
      console.error("Erreur lors de la génération du lien de partage:", error);
      alert("Impossible de générer le lien de partage.");
    }
  };

  // Fonction pour copier le lien dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert("Lien copié dans le presse-papiers !"))
      .catch((err) => console.error("Erreur lors de la copie:", err));
  };

  if (loading) return <p className="loading-message">Chargement de vos favoris...</p>;

  if (favoris.length === 0)
    return (
      <p className="empty-favorites-message">
        Vous n'avez aucun favori pour l'instant. Commencez à liker des vêtements !
      </p>
    );

  return (
    <div className="favoris-container">
      <h1 className="favoris-title">Mes Favoris</h1>
      <div className="favoris-grid">
        {favoris.map((item) => (
          <div className="favoris-card" key={item.id}>
            <img
              src={`http://localhost:8000/storage/${item.vetement.image}`}
              alt={item.vetement.name}
              className="favoris-card-image"
            />
            <h2 className="favoris-card-name">{item.vetement.name}</h2>
            <p className="favoris-card-category">
              Catégorie: {item.vetement.morphology ? item.vetement.morphology.name : "N/A"}
            </p>
            <div className="favoris-actions">
              <button
                onClick={() => removeFavori(item.vetement_id)}
                className="favoris-card-button delete-button"
              >
                <FaTrashAlt className="trash-icon" /> Supprimer
              </button>
              <button
                onClick={() => handleShareClick(item.vetement_id)}
                className="favoris-card-button share-button"
              >
                <FaShareAlt className="share-icon" /> Partager
              </button>
            </div>

            {/* Options de partage conditionnelles */}
            {showShareOptions === item.vetement_id && (
              <div className="share-options">
                <p className="share-text">Partager sur :</p>
                <div className="social-buttons">
                  <FacebookShareButton url={shareUrl} quote={`Découvrez ce vêtement sur Muse : ${item.vetement.name}`}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={`J'adore ce vêtement de Muse : ${item.vetement.name}`}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={`Découvrez ce vêtement sur Muse : ${item.vetement.name}`}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareUrl} title={`Vêtement coup de cœur sur Muse : ${item.vetement.name}`}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div className="copy-link-container">
                  <input type="text" value={shareUrl} readOnly className="share-link-input" />
                  <button onClick={copyToClipboard} className="copy-link-button">Copier le lien</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoris;