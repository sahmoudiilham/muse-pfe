import React, { useState } from "react";
import "../styles/Vetement.scss"; // استعملي SCSS هنا

const Vetement = () => {
  const vetements = [
    {
      id: 1,
      morpho: "Sablier",
      image: "/images/vetements/sablier1.jpg"
    },
    {
      id: 2,
      morpho: "Rectangle",
      image: "/images/vetements/blazer1.jpg"
    },
    {
      id: 3,
      morpho: "Pomme",
      image: "/images/vetements/tunique1.jpg"
    },
    {
      id: 4,
      morpho: "Poire",
      image: "/images/vetements/haut1.jpg"
    },
    {
      id: 5,
      morpho: "Triangle inversé",
      image: "/images/vetements/pantalon1.jpg"
    }
    // ... زيدي الباقي
  ];

  const selectedMorpho = JSON.parse(localStorage.getItem("selectedMorpho"));
  const [favoris, setFavoris] = useState(
    JSON.parse(localStorage.getItem("favoris")) || []
  );

  const handleLike = (item) => {
    const updated = [...favoris, item];
    setFavoris(updated);
    localStorage.setItem("favoris", JSON.stringify(updated));
  };

  const displayed = selectedMorpho
    ? vetements.filter((v) => v.morpho === selectedMorpho.name)
    : vetements;

  return (
    <div className="vetement-page">
      <h1>
        {selectedMorpho
          ? `Vêtements pour morphologie : ${selectedMorpho.name}`
          : "Tous les vêtements"}
      </h1>
      <div className="vetement-grid">
        {displayed.map((item) => (
          <div key={item.id} className="vetement-card">
            <img src={item.image} alt={`vetement-${item.id}`} />
            <p className="morpho-label">{item.morpho}</p>
            <button onClick={() => handleLike(item)} className="like-btn">❤️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vetement;
