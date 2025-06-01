import React, { useEffect, useState } from "react";
import "../styles/favoris.scss";

const Favoris = () => {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoris")) || [];
    setFavoris(saved);
  }, []);

  const removeFavori = (id) => {
    const updated = favoris.filter((item) => item.id !== id);
    setFavoris(updated);
    localStorage.setItem("favoris", JSON.stringify(updated));
  };

  return (
    <div className="favoris-container">
      <h1>Mes Favoris</h1>
      <div className="favoris-grid">
        {favoris.map((item) => (
          <div className="favoris-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Catégorie: {item.morpho}</p>
            <button onClick={() => removeFavori(item.id)}>❌ Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoris;
