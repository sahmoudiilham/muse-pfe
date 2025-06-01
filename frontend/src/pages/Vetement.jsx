import React, { useEffect, useState } from "react";
import axios from "axios";

const Vetements = () => {
  const [vetements, setVetements] = useState([]);
  const [filteredVetements, setFilteredVetements] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  useEffect(() => {
    const selectedMorpho = localStorage.getItem("selectedMorpho");
    if (selectedMorpho) {
      const filtered = vetements.filter(
        (v) => v.morphology && v.morphology.name === selectedMorpho
      );
      setFilteredVetements(filtered);
    } else {
      setFilteredVetements(vetements);
    }
  }, [vetements]);

  if (loading) return <p>Chargement...</p>;

  if (filteredVetements.length === 0)
    return <p>Aucun vêtement pour cette morphologie.</p>;

  return (
    <div className="vetements-container">
      <h1>Vêtements pour votre morphologie</h1>
      <div className="vetements-grid">
        {filteredVetements.map((v) => (
          <div className="vetement-card" key={v.id}>
            <img src={`http://localhost:8000/storage/${v.image_url}`} alt={v.name} />
            <h2>{v.name}</h2>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vetements;
