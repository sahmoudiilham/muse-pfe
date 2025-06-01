import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Morphologie.scss";

const morphologies = [
  {
    name: "Sablier",
    description: "Taille marquée, épaules et hanches équilibrées.",
    image: "/images/morphologies/sablier.jpg",
  },
  {
    name: "Rectangle",
    description: "Épaules, taille et hanches alignées.",
    image: "/images/rectangle.jpg",
  },
  {
    name: "Pomme",
    description: "Volume concentré sur le haut du corps.",
    image: "/images/pomme.jpg",
  },
  {
    name: "Poire",
    description: "Hanches plus larges que les épaules.",
    image: "/images/poire.jpg",
  },
  {
    name: "Triangle inversé",
    description: "Épaules larges, hanches étroites.",
    image: "/images/triangle.jpg",
  },
];

const Morphologie = () => {
  const navigate = useNavigate();

const handleSelect = (morpho) => {
  localStorage.setItem("selectedMorpho", morpho.name);
  window.location.href = "/vetements";
};

  return (
    <div className="morpho-container">
      <h1>Choisissez votre morphologie</h1>
      <div className="morpho-grid">
        {morphologies.map((m, i) => (
          <div className="morpho-card" key={i}>
            <img src={m.image} alt={m.name} />
            <h2>{m.name}</h2>
            <p>{m.description}</p>
            <button onClick={() => handleSelect(m)}>Choisir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Morphologie;
