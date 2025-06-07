import React, { useEffect, useState } from 'react';

export default function MorphologyPage() {
  const [morphologies, setMorphologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/morphologies')
      .then(res => res.json())
      .then(data => {
        setMorphologies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur fetching morphologies:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des morphologies...</p>;

  return (
    <div>
      <h2>Types de Morphologie</h2>
      <ul>
        {morphologies.map(morpho => (
          <li key={morpho.id}>
            <h3>{morpho.name}</h3>
            <p>{morpho.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
