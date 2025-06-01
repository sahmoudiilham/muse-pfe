import React, { useEffect, useState } from 'react';
import '../styles/palette.scss';

export default function Palette() {
  const [palettes, setPalettes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // المستخدم ما مسجلش الدخول، redirect لصفحة login
    window.location.href = "/login";
    return;
  }
  fetch('http://localhost:8000/api/palettes', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Unauthorized or error fetching palettes');
      }
      return res.json();
    })
    .then(data => {
      setPalettes(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching palettes:', err);
      setLoading(false);
    });
}, []);


  const handleSelect = (palette) => {
    setSelected(palette);
  };

  const downloadPalette = () => {
    if (!selected) return;
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    selected.colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * 50, 0, 50, 100);
    });

    const link = document.createElement('a');
    link.download = `${selected.skin_tone}_palette.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) return <div className="palette-page">Loading palettes...</div>;

  return (
    <div className="palette-page">
      <h2>Choisissez votre couleur de peau</h2>

      <div className="skin-options">
        {palettes.map(palette => (
          <div
            key={palette.id}
            className={`skin-option ${selected?.id === palette.id ? 'selected' : ''}`}
            style={{ backgroundColor: palette.skin_color }}
            onClick={() => handleSelect(palette)}
            title={palette.skin_tone}
          >
            {palette.skin_tone}
          </div>
        ))}
      </div>

      {selected && (
        <div className="palette-result">
          <h3>{selected.skin_tone}</h3>
          <p className="description">{selected.description}</p>

          <div className="palette-preview">
            <div className="color-palette">
              {selected.colors.map((color, i) => (
                <div
                  key={i}
                  className="palette-color"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
            <button className="save-btn" onClick={downloadPalette}>Télécharger la palette</button>
            {/* Add more share buttons here later */}
          </div>
        </div>
      )}
    </div>
  );
}
