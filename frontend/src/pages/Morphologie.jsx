import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Morphologie.scss";

const Morphologie = () => {
  const navigate = useNavigate();
  const [morphologies, setMorphologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/morphologies")
      .then((res) => {
        setMorphologies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des morphologies");
        setLoading(false);
      });
  }, []);

  const handleSelect = (morpho) => {
    localStorage.setItem("selectedMorpho", morpho.name);
    navigate("/vetement"); // توجيه لصفحة الملابس باستخدام react-router
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="morpho-container">
      <h1>Choisissez votre morphologie</h1>
      <div className="morpho-grid">
        {morphologies.map((m) => (
          <div className="morpho-card" key={m.id}>
            <img
              src={`http://localhost:8000/storage/${m.image_url}`}
              alt={m.name}
              style={{ width: "200px", height: "auto", borderRadius: "8px" }}
            />
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
