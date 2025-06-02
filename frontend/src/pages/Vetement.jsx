import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/vetement.scss";


const Vetements = () => {
  const [vetements, setVetements] = useState([]);
  const [filteredVetements, setFilteredVetements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(() => {
    // باش تعرف واش كاين filter ف localStorage من البداية
    return localStorage.getItem("selectedMorpho") !== null;
  });

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
      setFilterActive(true);
    } else {
      setFilteredVetements(vetements);
      setFilterActive(false);
    }
  }, [vetements]);

  const clearFilter = () => {
    localStorage.removeItem("selectedMorpho");
    setFilteredVetements(vetements);
    setFilterActive(false); // هنا كنخليو الزرّ يختفي
  };

  if (loading) return <p>Chargement...</p>;

  if (filteredVetements.length === 0)
    return <p>Aucun vêtement disponible pour cette morphologie.</p>;

  return (
    <div className="vetements-container">
      <h1>
        Vêtements {filterActive ? `pour la morphologie ${localStorage.getItem("selectedMorpho")}` : "disponibles"}
      </h1>

      {/* كنورّيو الزر غير إلا كان الفلتر مفعل */}
      {filterActive && (
        <button onClick={clearFilter}>Voir tous les vêtements</button>
      )}

      <div className="vetements-grid">
        {filteredVetements.map((v) => (
          <div className="vetement-card" key={v.id}>
            <img src={`http://localhost:8000/storage/${v.image}`} alt={v.name} />
            <p>{v.likes} ❤️</p>
            <button onClick={() => handleLike(v.id)}>Like</button>
            <h2>{v.name}</h2>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vetements;
