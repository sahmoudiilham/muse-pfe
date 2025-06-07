import React, { useEffect, useState } from 'react';

export default function PalettePage() {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/palettes')
      .then(res => res.json())
      .then(data => {
        setPalettes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur fetching palettes:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des palettes...</p>;

  return (
    <div>
      <h2>Palettes de Couleurs</h2>
      <ul>
        {palettes.map(palette => (
          <li key={palette.id} style={{ marginBottom: '20px' }}>
            <h3>{palette.skin_tone}</h3>
            <p>{palette.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
